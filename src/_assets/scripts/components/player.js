/* eslint react/sort-comp:0 */
/* eslint react/prop-types:0 */

import Marty from 'marty';
import React from 'react';
import PlayerStore from '../stores/playerStore.js';
import PlayerAction from '../actions/playerAction.js';
import Youtube from '../lib/youtube.js';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isPlaying: false
    };
    this.propTypes = {
      currentSong: React.PropTypes.string
    };
  }

  componentDidMount() {
    this.loadPlayer();
  }

  componentDidUpdate() {
    this.loadSong();
  }

  loadPlayer() {
    this.youtube = new Youtube();
    this.youtubeLoaded = this.youtube.initApi()
    .then(function loadPlayer() {
      this.state.isLoading = false;
      return this.youtube.initPlayer('player__youtube', this.onPlayerStateChange);
    }.bind(this));
  }

  loadSong() {
    let videoUrl = this.props.currentSong.url;
    let videoID = Youtube.urlToID(videoUrl);
    this.youtubeLoaded.then(function loadVideo(player) {
      player.loadVideoById({
        videoId: videoID,
        startSeconds: 0,
        suggestedQuality: 'small'
      });
    }.bind(this));
  }

  queueNextSong() {
    console.log('queueNextSong');
    // fire action creator to modify store
  }

  onPlayerStateChange(event) {
    const ended = 0;
    if (event.data === ended) {
      this.queueNextSong();
    }
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
}

let PlayerContainer = Marty.createContainer(Player, {
  listenTo: PlayerStore,
  fetch: {
    currentSong() {
      return PlayerStore.getCurrentSong();
    }
  }
});

export default PlayerContainer;
