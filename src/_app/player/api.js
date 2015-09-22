/* eslint new-cap: 0 */

import _, { isEmpty } from 'lodash';
import { Promise } from 'es6-promise';
import Rx, { Observable } from 'rx';

export class Utilities {
  static urlIsSoundcloud(url) {
    const soundcloudUrl = 'soundcloud.com';
    return _.includes(url, soundcloudUrl);
  }

  static urlIsYoutube(url) {
    const youtubeUrl = 'youtube.com';
    const youtubeShortUrl = 'youtu.be';
    return _.includes(url, youtubeUrl) || _.includes(url, youtubeShortUrl);
  }

  static youtubeUrlToId(url) {
    const youtubeShortUrl = 'youtu.be';
    let videoId;
    const parser = document.createElement('a');
    parser.href = url;
    if (_.includes(url, youtubeShortUrl)) {
      videoId = parser.pathname.split('/')[1];
    } else {
      let params = parser.search;
      params = params.replace('?', '').split('&');
      params = _.reduce(params, function generateParams(memo, p) {
        const key = p.split('=')[0];
        memo[key] = p.split('=')[1];
        return memo;
      }, {});

      videoId = params.v;
    }

    return videoId;
  }
}

/**
 * Load the youtube and soundcloud api script.
 */

import 'contrib/soundcloud.player.api.js';

class AudioPlayer {
  constructor() {
    this._currentSong = null;
    this._player = {};
    this._youtubeApiPromise = null;
    this._soundcloudApiPromise = null;
    this._playerStates = {
      ENDED: 'ENDED',
      PLAYING: 'PLAYING',
      PAUSED: 'PAUSED'
    };
    this._youtubePlayerStream = new Rx.Subject();
    this._soundcloudPlayerStream = new Rx.Subject();
  }

  loadSoundcloud() {
    /**
     * Load the soundcloud api script.
     * The soundcloud script synchronously attaches a global `SC` object
     */
    const _this = this;
    if (_.isEmpty(_this._soundcloudApiPromise)) {
      const mountNode = 'soundcloud-mount-node';
      const playerElementId = 'soundcloud-iframe-container';
      const soundcloudIframe = document.createElement('iframe');
      soundcloudIframe.id = playerElementId;
      soundcloudIframe.width = '100%';
      soundcloudIframe.height = '100%';
      soundcloudIframe.setAttribute('frameborder', 'no');
      soundcloudIframe.setAttribute('scrolling', 'no');
      soundcloudIframe.src = 'https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1848538';
      document.getElementById(mountNode).appendChild(soundcloudIframe);

      _this._soundcloudApiPromise = new Promise(function handleSCPromise(resolve, reject) {
        if (_.isEmpty(window.SC.Widget)) {
          reject('window.SC.Widget is undefined');
        }

        if (window.SC) {
          const iframeElement = document.querySelector('#' + playerElementId);
          _this._player.soundcloudPlayer = window.SC.Widget(iframeElement);

          const { PLAY, PAUSE, FINISH } = SC.Widget.Events;
          const { PLAYING, PAUSED, ENDED } = _this._playerStates;
          _this._player.soundcloudPlayer.bind(PLAY, () => {
            _this._soundcloudPlayerStream.onNext(PLAYING);
          });
          _this._player.soundcloudPlayer.bind(PAUSE, () => {
            _this._soundcloudPlayerStream.onNext(PAUSED);
          });
          _this._player.soundcloudPlayer.bind(FINISH, () => {
            _this._soundcloudPlayerStream.onNext(ENDED);
          });

          resolve(_this._player.soundcloudPlayer);
        }
      });
    }

    return _this._soundcloudApiPromise;
  }

  loadYoutube() {
    /**
     * Load the youtube api script.
     * The youtube script asynchronously loads the iframe api.
     * When loaded, it will fire the `window.onYouTubeIframeAPIReady`
     */
    const _this = this;
    if (_.isEmpty(_this._youtubeApiPromise)) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      _this._youtubeApiPromise = new Promise(function handleYoutubePromise(resolve, reject) {
        window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
          if (_.isEmpty(window.YT)) {
            reject('window.YT is undefined');
          }

          const mountNode = 'youtube-mount-node';
          _this._player.youtubePlayer = new window.YT.Player(mountNode, {
            height: '100%',
            width: '100%',
            playerVars: {
              autohide: 0
            },
            events: {
              onReady: function onYoutubePlayerReady() {
                resolve(_this._player.youtubePlayer);  // resolve promise
              },

              onStateChange: function onStateChange(event) {
                _this._youtubePlayerStream.onNext(event);  // pipe raw player events to stream
              }
            }
          });
        };
      });
    }

    return _this._youtubeApiPromise;
  }

  play(url) {
    this.pause();  // pause any currently playing song
    if (Utilities.urlIsSoundcloud(url)) {
      this._playSoundcloud(url);
    }

    if (Utilities.urlIsYoutube(url)) {
      this._playYoutube(url);
    }
  }

  _playSoundcloud(url) {
    const _this = this;
    this.loadSoundcloud().then(function onSuccess(soundcloudPlayer) {
      if (_this._currentSong === url) {
        soundcloudPlayer.play();
      } else {
        _this._currentSong = url;
        soundcloudPlayer.load(url, {
          buying: false,
          liking: false,
          callback: function onPlayerReady() {
            soundcloudPlayer.play();
          }
        });
      }
    });
  }

  _playYoutube(url) {
    const _this = this;
    this.loadYoutube().then(function onSuccess(youtubePlayer) {
      if (_this._currentSong === url) {
        youtubePlayer.playVideo();
      } else {
        _this._currentSong = url;
        const videoId = Utilities.youtubeUrlToId(url);
        youtubePlayer.loadVideoById({
          videoId: videoId,
          startSeconds: 0,
          suggestedQuality: 'small'
        });
      }
    });
  }

  pause() {
    this._pauseYoutube();
    this._pauseSoundcloud();
  }

  _pauseYoutube() {
    if (this._player.youtubePlayer) {
      this._player.youtubePlayer.pauseVideo();
    }
  }

  _pauseSoundcloud() {
    if (this._player.soundcloudPlayer) {
      this._player.soundcloudPlayer.pause();
    }
  }

  seekTo() {
    // seek to seconds
  }

  setVolume(volume) {
    this._player.youtubePlayer.setVolume(volume);
    this._player.soundcloudPlayer.setVolume(volume);
  }

  getStream() {
    const youtubePlayerStream = this._getYoutubeStream();
    const soundcloudPlayerStream = this._getSoundcloudStream();
    return Observable.merge(youtubePlayerStream, soundcloudPlayerStream);
  }

  _getYoutubeStream() {
    const youtubeStates = {
      0: this._playerStates.ENDED,
      1: this._playerStates.PLAYING,
      2: this._playerStates.PAUSED
    };
    return this._youtubePlayerStream
      .map((state) => {
        return youtubeStates[state.data];
      })
      .filter((state) => {
        return !isEmpty(state);
      });
  }

  _getSoundcloudStream() {
    return this._soundcloudPlayerStream
      .map((state) => {
        return state;
      })
      .filter((state) => {
        return !isEmpty(state);
      });
  }
}

export default AudioPlayer;
