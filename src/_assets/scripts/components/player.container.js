/* eslint react/sort-comp: 0 */

import React from 'react';
import Player from './base/player.js';
import Dispatcher from '../dispatcher.js';
import PlayerActions from '../actions/player.js';

class PlayerContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  playSong() {
    let action = PlayerActions.playSong();
    return Dispatcher.dispatch(action);
  }

  pauseSong() {
    let action = PlayerActions.pauseSong();
    return Dispatcher.dispatch(action);
  }

  nextSong() {
    let currentSong = this.props.currentSong;
    let action = PlayerActions.nextSong(currentSong);
    return Dispatcher.dispatch(action);
  }

  prevSong() {
    let currentSong = this.props.currentSong;
    let action = PlayerActions.prevSong(currentSong);
    return Dispatcher.dispatch(action);
  }

  render() {
    return (
      <Player
        song={this.props.currentSong}
        playSong={this.playSong.bind(this)}
        pauseSong={this.pauseSong.bind(this)}
        nextSong={this.nextSong.bind(this)}
        prevSong={this.prevSong.bind(this)} />
    );
  }
}

PlayerContainer.propTypes = {
  currentSong: React.PropTypes.object
};

export default PlayerContainer;
