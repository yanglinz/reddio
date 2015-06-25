/* eslint new-cap: 0 */

import _ from 'lodash';
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
    this.player = {};
    this.youtubeApiStream = new Rx.Subject();
    this.youtubePlayerStream = new Rx.Subject();
    this.soundcloudApiStream = new Rx.Subject();
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

    const elementID = 'soundcloud-player-container';
    let soundcloudIframe = document.createElement('iframe');
    soundcloudIframe.id = elementID;
    soundcloudIframe.width = '100%';
    soundcloudIframe.height = '150';
    soundcloudIframe.src = 'https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1848538';
    document.body.appendChild(soundcloudIframe);

    // use promise instead of streams
    if (window.SC) {
      const iframeElement = document.querySelector('#' + elementID);
      this.player.soundcloudPlayer = window.SC.Widget(iframeElement);
      this.soundcloudApiStream.onNext(window.SC);
    }
  }

  loadYoutube() {
    /**
     * Load the youtube api script.
     * The youtube script asynchronously loads the iframe api.
     * When loaded, it will fire the `window.onYouTubeIframeAPIReady`
     */

    let _this = this;
    const elementID = 'youtube-player-container';
    let youtubeContainer = document.createElement('div');
    youtubeContainer.id = elementID;
    document.body.appendChild(youtubeContainer);

    window.onYouTubeIframeAPIReady = function resolveYoutube() {
      const width = 420;
      const height = 120;

      // assign `youtubePlayer` semi-global `player` to be used elsewhere
      _this.player.youtubePlayer = new window.YT.Player(elementID, {
        width: width,
        height: height,
        events: {
          onReady: function onYoutubePlayerReady() {
            _this.youtubeApiStream.onNext(_this.player.youtubePlayer);
            _this.youtubeApiStream.onCompleted();
          },

          onStateChange: function onStateChange(event) {
            _this.youtubePlayerStream.onNext(event);
          }
        }
      });
    };
  }

  play(url) {
    // pause any currently playing song
    this.pause();
    if (Utilities.urlIsSoundcloud(url)) {
      this._playSoundcloud(this.player.soundcloudPlayer, url);
    }

    if (Utilities.urlIsYoutube(url)) {
      this._playYoutube(this.player.youtubePlayer, url);
    }
  }

  _playSoundcloud(soundcloudPlayer, url) {
    soundcloudPlayer.load(url, {callback: function onPlayerReady() {
      soundcloudPlayer.play();
    }});
  }

  _playYoutube(youtubePlayer, url) {
    let noop = function noop() {};

    let onComplete = function onComplete() {
      var videoId = Utilities.youtubeUrlToId(url);
      youtubePlayer.loadVideoById({
        videoId: videoId,
        startSeconds: 0,
        suggestedQuality: 'small'
      });
    };

    this.youtubeApiStream.subscribe(noop, noop, onComplete);
  }

  pause() {
    this.player.youtubePlayer.stopVideo();
    this.player.soundcloudPlayer.pause();
  }

  seekTo() {
    // seek to seconds
  }

  setVolume(volume) {
    this.player.youtubePlayer.setVolume(volume);
    this.player.soundcloudPlayer.setVolume(volume);
  }
}

export default AudioPlayer;
