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
    window.SC.Widget(iframeElement);
    soundcloudApiStream.onNext(window.SC);
  }
})(window, document, soundcloudApiStream);

class Utilities {
  static urlIsYoutube(url) {
    return true; // TODO: write real function
  }

  static youtubeUrlToId(url) {
    console.log('url', url);
    const params = _.last(url.split('?'));
    return params.replace('v=', '');
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
    this.pause(); // pause any currently playing song
    if (Utilities.urlIsYoutube(url)) {
      this.playYoutube(this.player.youtubePlayer, url);
    }
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

  pause() {
    // pause a song
  }

  seekTo(seconds) {
    // seek to seconds
  }

  setVolume(percent) {
    // set volume
  }
}

export default AudioPlayer;
