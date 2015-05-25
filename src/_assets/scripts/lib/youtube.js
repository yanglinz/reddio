'use strict';

var _ = require('lodash');
var RSVP = require('rsvp');

class YouTube {
  constructor(options={}) {
    this.playerHeight = options.playerHeight || 100;
    this.playerWidth = options.playerWidth || window.innerWidth;
  }

  initApi() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    return new RSVP.Promise(function(resolve, reject) {
      window.onYouTubeIframeAPIReady = function() {
        resolve(window.YT);
      };
    });
  }

  initPlayer(elementID) {
    if (typeof(window.YT) == 'undefined') {
      return console.error('youtube api not loaded');
    }

    return new RSVP.Promise(function(resolve, reject) {
      var player = new window.YT.Player(elementID, {
        height: this.playerHeight,
        width: this.playerWidth,
        events: {
          onReady: function onYoutubePlayerReady() {
            resolve(player);
          }
        }
      });
    }.bind(this));
  }

  static urlToID (url) {
    const params = _.last(url.split('?'));
    return params.replace('v=', '');
  }
}

module.exports = YouTube