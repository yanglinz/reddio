/* eslint react/sort-comp: 0 */

import React from 'react';
import Player from '../app/player.js';
import dispatcher from '../../core/dispatcher.js';
import PlayerActions from '../../player/actions.js';
import { appState } from '../../core/state.js';

class PlayerController extends React.Component {
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

PlayerController.propTypes = {
  currentSong: React.PropTypes.object
};

export default PlayerController;
