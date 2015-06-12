import _ from 'lodash';
import Rx from 'rx';
import {errorLogger} from './logger.js';

/**
 * Load the youtube and soundcloud api script.
 * The youtube script asynchronously loads the iframe api.
 * When loaded, it will fire the `window.onYouTubeIframeAPIReady`
 * The soundcloud script synchronously attaches a global `SC` object
 */

import '../contrib/soundcloud.player.api.js';
import '../contrib/youtube.iframe.api.js';

let player = {}; // must be an object so assignments are by reference
let youtubeApiStream = new Rx.Subject();
let youtubePlayerStream = new Rx.Subject();
let soundcloudApiStream = new Rx.Subject();
let soundcloudPlayerStream = new Rx.Subject();

(function loadYoutube() {
  window.onYouTubeIframeAPIReady = function resolveYoutube() {
    const elementID = 'youtube_player';
    const width = 420;
    const height = 120;

    // assign `youtubePlayer` semi-global `player` to be used elsewhere
    player.youtubePlayer = new window.YT.Player(elementID, {
      width: width,
      height: height,
      events: {
        onReady: function onYoutubePlayerReady() {
          youtubeApiStream.onNext(player.youtubePlayer);
          youtubeApiStream.onCompleted();
        },
        onStateChange: function onStateChange(event) {
          youtubePlayerStream.onNext(event);
        }
      }
    });
  };
})();

(function loadSoundcloud(window, document, soundcloudApiStream) {
  if (window.SC) {
    const elementID = '#soundcloud_player';
    const iframeElement = document.querySelector(elementID);
    player.soundcloudPlayer = window.SC.Widget(iframeElement);
    soundcloudApiStream.onNext(window.SC);
  }
})(window, document, soundcloudApiStream);

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
    let parser = document.createElement('a');
    parser.href = url;
    if (_.includes(url, youtubeShortUrl)) {
      return parser.pathname.split('/')[1];
    } else {
      let params = parser.search;
      params = params.replace('?', '').split('&');
      params = _.reduce(params, function generateParams(memo, p) {
        let key = p.split('=')[0];
        let val = p.split('=')[1];
        memo[key] = val;
        return memo;
      }, {});
      return params.v;
    }
  }
}

class AudioPlayer {
  constructor() {
    this.player = player;
    this.youtubeApiStream = youtubeApiStream;
    this.youtubePlayerStream = youtubePlayerStream;
    this.soundcloudApiStream = soundcloudApiStream;
    this.soundcloudPlayerStream = soundcloudPlayerStream;
  }

  play(url) {
    // pause any currently playing song
    this.pause(this.player.youtubePlayer, this.player.soundcloudPlayer);
    if (Utilities.urlIsSoundcloud(url)) {
      this.playSoundcloud(this.player.soundcloudPlayer, url);
    }
    if (Utilities.urlIsYoutube(url)) {
      this.playYoutube(this.player.youtubePlayer, url);
    }
  }

  playSoundcloud(soundcloudPlayer, url) {
    soundcloudPlayer.load(url, {callback: function onPlayerReady() {
      soundcloudPlayer.play();
    }});
  }

  playYoutube(youtubePlayer, url) {
    let noop = function noop() {};
    this.youtubeApiStream.subscribe(noop, noop,
      function onComplete() {
        var videoId = Utilities.youtubeUrlToId(url);
        youtubePlayer.loadVideoById({
          videoId: videoId,
          startSeconds: 0,
          suggestedQuality: 'small'
        });
      }
    );
  }

  pause(youtubePlayer, soundcloudPlayer) {
    try {
      youtubePlayer.stopVideo();
    } catch(err) {/* intentionally empty */}
    try {
      soundcloudPlayer.pause();
    } catch(err) {/* intentionally empty */}
  }

  seekTo(seconds) {
    // seek to seconds
  }

  setVolume(percent) {
    // set volume
  }
}

export default AudioPlayer;
