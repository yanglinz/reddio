/* eslint react/sort-comp: 0, react/prop-types: 0 */

import Marty from 'marty';
import React from 'react';
import PlayerStore from '../stores/playerStore.js';
import PlayerAction from '../actions/playerAction.js';
import AudioPlayer from '../lib/audio.js';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.props.currentSong = this.props.currentSong || {};
    this.state = {
      isLoading: true,
      isPlaying: false,
      progress: 0,
      volume: 100
    };
  }

  componentDidMount() {
    this.audioPlayer = new AudioPlayer();
    this.audioPlayer.load();
  }

  componentDidUpdate() {
    this.playSong();
  }

  playSong() {
    this.audioPlayer.play(this.props.currentSong.url);
  }

  nextSong() {
    PlayerAction.nextSong();
  }

  prevSong() {
    PlayerAction.prevSong();
  }

  render() {
    return (
      <div className="player">
        <div className="controls">
          <div className="song-control">
            <p className="prev" onClick={this.prevSong.bind(this)}>Prev song</p>
            <p className="play">Play song</p>
            <p className="next" onClick={this.nextSong.bind(this)}>Next song</p>
          </div>

          <div className="song-status">
            <div className="song-title">
              <h3>{this.props.currentSong.title}</h3>
            </div>

            <div className="progress">
            </div>
          </div>

          <div className="player-control">
            <div className="volume">
            </div>

            <div className="shuffle">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  currentSong: React.PropTypes.string
};

let PlayerContainer = Marty.createContainer(Player, {
  listenTo: PlayerStore,
  fetch: {
    currentSong() {
      return PlayerStore.getCurrentSong();
    }
  }
});

export default PlayerContainer;
