'use strict';

import Marty from 'marty';
import React from 'react';
import PlayerStore from '../stores/playerStore.js';
import Youtube from '../lib/youtube.js';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isPlaying: false
    };
  }

  render() {
    return (
      <div className="player">
        <div className="wrap">
          <div id="player__youtube"></div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.loadPlayer();
  }

  componentDidUpdate() {
    this.playSong();
  }

  loadPlayer() {
    this.youtube = new Youtube();
    this.youtubeLoaded = this.youtube.initApi()
    .then(function() {
      this.state.isLoading = false;
      return this.youtube.initPlayer('player__youtube');
    }.bind(this));
  }

  playSong() {
    let videoUrl = this.props.currentSong.url;
    let videoID = Youtube.urlToID(videoUrl);
    this.youtubeLoaded.then(function(player) {
      player.loadVideoById({
        videoId: videoID,
        startSeconds: 0,
        suggestedQuality: 'small'
      });
    }.bind(this));
  }
}

let PlayerContainer = Marty.createContainer(Player, {
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

export default PlayerContainer;
