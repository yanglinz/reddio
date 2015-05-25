var React = require('react');
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
        </div>
      </div>
    );
  },

  componentDidMount: function() {
    this.youtube = new Youtube();
    this.youtube.initApi()
    .then(function() {
      return this.youtube.initPlayer('player__youtube');
    }.bind(this))
    .then(function(player) {
      this.player = player;
      this.state.isLoading = false;
      var videoId = 'bpOSxM0rNPM';
      this.player.loadVideoById({
        videoId: videoId,
        startSeconds: 0,
        suggestedQuality: 'small'
      });
    }.bind(this))
    .catch(function (err) {});
  }
});

module.exports = Player;
