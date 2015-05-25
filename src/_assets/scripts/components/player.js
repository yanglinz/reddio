'use strict';

var Marty = require('marty');
var React = require('react');
var PlayerStore = require('../stores/playerStore.js');
var Youtube = require('../lib/youtube.js');

var Player = React.createClass({
  getInitialState: function () {
    return {
      isLoading: true,
      isPlaying: false
    };
  },

  render: function () {
    return (
      <div className="player">
        <div className="wrap">
          <div id="player__youtube"></div>
        </div>
      </div>
    );
  },

  componentDidMount: function() {
    this.loadPlayer();
  },

  componentDidUpdate: function() {
    this.playSong();
  },

  loadPlayer: function () {
    this.youtube = new Youtube();
    this.youtubeLoaded = this.youtube.initApi()
    .then(function() {
      this.state.isLoading = false;
      return this.youtube.initPlayer('player__youtube');  // promise
    }.bind(this));
  },

  playSong: function () {
    var videoUrl = this.props.currentSong.url;
    var videoID = Youtube.urlToID(videoUrl);
    this.youtubeLoaded.then(function(player) {
      player.loadVideoById({
        videoId: videoID,
        startSeconds: 0,
        suggestedQuality: 'small'
      });
    }.bind(this));
  }
});

module.exports = Marty.createContainer(Player, {
  listenTo: PlayerStore,
  fetch: {
    queue() {
      return PlayerStore.getQueue();
    },

    currentSong() {
      return PlayerStore.getCurrentSong();
    }
  }
});
