/* eslint new-cap: 0 */

import _ from 'lodash';
import RSVP from 'rsvp';
import Rx from 'rx';

class Utilities {
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
    let parser = document.createElement('a');
    parser.href = url;
    if (_.includes(url, youtubeShortUrl)) {
      videoId = parser.pathname.split('/')[1];
    } else {
      let params = parser.search;
      params = params.replace('?', '').split('&');
      params = _.reduce(params, function generateParams(memo, p) {
        let key = p.split('=')[0];
        let val = p.split('=')[1];
        memo[key] = val;
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

import '../contrib/soundcloud.player.api.js';
import '../contrib/youtube.iframe.api.js';

class AudioPlayer {
  constructor() {
    this._player = {};
    this._youtubeApiPromise = null;
    this._soundcloudApiPromise = null;
    this.youtubePlayerStream = new Rx.Subject();
    this.soundcloudPlayerStream = new Rx.Subject();
  }

  load() {
    this.loadSoundcloud();
    this.loadYoutube();
  }

  loadSoundcloud() {
    /**
     * Load the soundcloud api script.
     * The soundcloud script synchronously attaches a global `SC` object
     */
    let _this = this;
    if (_.isEmpty(_this._youtubeApiPromise)) {
      const elementID = 'soundcloud-player-container';
      let soundcloudIframe = document.createElement('iframe');
      soundcloudIframe.id = elementID;
      soundcloudIframe.width = '100%';
      soundcloudIframe.height = '150';
      soundcloudIframe.src = 'https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1848538';
      document.body.appendChild(soundcloudIframe);

      _this._soundcloudApiPromise = new RSVP.Promise(function handleSCPromise(resolve, reject) {
        if (_.isEmpty(window.SC.Widget)) {
          reject('window.SC.Widget is undefined');
        }

        if (window.SC) {
          const iframeElement = document.querySelector('#' + elementID);
          _this._player.soundcloudPlayer = window.SC.Widget(iframeElement);
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
    let _this = this;
    if (_.isEmpty(_this._youtubeApiPromise)) {
      const elementID = 'youtube-player-container';
      let youtubeContainer = document.createElement('div');
      youtubeContainer.id = elementID;
      document.body.appendChild(youtubeContainer);

      _this._youtubeApiPromise = new RSVP.Promise(function handleYoutubePromise(resolve, reject) {
        window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
          if (_.isEmpty(window.YT)) {
            reject('window.YT is undefined');
          }

          _this._player.youtubePlayer = new window.YT.Player(elementID, {
            width: 420,
            height: 120,
            events: {
              onReady: function onYoutubePlayerReady() {
                resolve(_this._player.youtubePlayer);  // resolve promise
              },

              onStateChange: function onStateChange(event) {
                _this.youtubePlayerStream.onNext(event);  // pipe raw player events to stream
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
    this.loadSoundcloud().then(function onSuccess(soundcloudPlayer) {
      soundcloudPlayer.load(url, {callback: function onPlayerReady() {
        soundcloudPlayer.play();
      }});
    });
  }

  _playYoutube(url) {
    this.loadYoutube().then(function onSuccess(youtubePlayer) {
      const videoId = Utilities.youtubeUrlToId(url);
      youtubePlayer.loadVideoById({
        videoId: videoId,
        startSeconds: 0,
        suggestedQuality: 'small'
      });
    });
  }

  pause() {
    this._player.youtubePlayer.stopVideo();
    this._player.soundcloudPlayer.pause();
  }

  seekTo() {
    // seek to seconds
  }

  setVolume(volume) {
    this._player.youtubePlayer.setVolume(volume);
    this._player.soundcloudPlayer.setVolume(volume);
  }
}

export default AudioPlayer;
