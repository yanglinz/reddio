/* eslint react/sort-comp: 0, react/prop-types: 0 */

import Marty from 'marty';
import React from 'react';
import PlayerStore from '../stores/playerStore.js';
import PlayerAction from '../actions/playerAction.js';
import AudioPlayer from '../lib/audio.js';

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
    this.audioPlayer = new AudioPlayer();
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
      <div id="controls">
        <p onClick={this.nextSong.bind(this)}>Next song</p>
        <p onClick={this.prevSong.bind(this)}>Prev song</p>
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
