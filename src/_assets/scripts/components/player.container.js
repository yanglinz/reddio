/* eslint react/sort-comp: 0 */

import React from 'react';
import Player from './player.js';
import dispatcher from '../dispatcher.js';
import PlayerActions from '../actions/player.js';
import { appState } from '../state/state.js';

class PlayerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = appState.getState('player');
  }

  playSong() {
    let action = PlayerActions.playSong();
    dispatcher.dispatch(action);
  }

  pauseSong() {
    let action = PlayerActions.pauseSong();
    return dispatcher.dispatch(action);
  }

  nextSong() {
    let currentSong = this.props.currentSong;
    let action = PlayerActions.nextSong(currentSong);
    dispatcher.dispatch(action);
  }

  prevSong() {
    let currentSong = this.props.currentSong;
    let action = PlayerActions.prevSong(currentSong);
    dispatcher.dispatch(action);
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
