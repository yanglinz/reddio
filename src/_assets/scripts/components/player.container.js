import React from 'react';
import Player from './base/player.js';
import Dispatcher from '../dispatcher.js';
import PlayerActions from '../actions/player.js';

class PlayerContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  playSong() {
    let currentSong = this.props.currentSong;
    return Dispatcher.dispatch(PlayerActions.playSong(currentSong));
  }

  pauseSong() {
    return Dispatcher.dispatch(PlayerActions.pauseSong());
  }

  nextSong() {
    let currentSong = this.props.currentSong;
    return Dispatcher.dispatch(PlayerActions.nextSong(currentSong));
  }

  prevSong() {
    let currentSong = this.props.currentSong;
    return Dispatcher.dispatch(PlayerActions.prevSong(currentSong))
  }

  render() {
    return (
      <Player
        playSong={this.playSong.bind(this)}
        pauseSong={this.pauseSong.bind(this)}
        nextSong={this.nextSong.bind(this)}
        prevSong={this.prevSong.bind(this)} />
    );
  }
}

Player.propTypes = {
  currentSong: React.PropTypes.object
};

export default PlayerContainer;
