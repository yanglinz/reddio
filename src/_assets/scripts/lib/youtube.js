import _ from 'lodash';
import RSVP from 'rsvp';
import {errorLogger} from './logger.js';

class YouTube {
  constructor(options={}) {
    this.playerHeight = options.playerHeight || 100;
    this.playerWidth = options.playerWidth || window.innerWidth;
  }

  initApi() {
    let tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    return new RSVP.Promise(function resolveApi(resolve) {
      window.onYouTubeIframeAPIReady = function resolveYT() {
        resolve(window.YT);
      };
    });
  }

  initPlayer(elementID, onStateChange) {
    if (typeof window.YT === 'undefined') {
      return errorLogger('Youtube api not loaded');
    }

    return new RSVP.Promise(function resolvePlayer(resolve) {
      let player = new window.YT.Player(elementID, {
        height: this.playerHeight,
        width: this.playerWidth,
        events: {
          onReady: function onYoutubePlayerReady() {
            resolve(player);
          },
          onStateChange: onStateChange
        }
      });
    }.bind(this));
  }

  static urlToID(url) {
    const params = _.last(url.split('?'));
    let id = params.replace('v=', '');
    console.log('urlToID', url, id);
    return id;
  }
}

export default YouTube;
