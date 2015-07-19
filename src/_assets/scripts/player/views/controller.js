/* eslint react/sort-comp: 0 */

import _ from 'lodash';
import React from 'react';
import Player from './player.js';
import Iframe from './iframes.js';
import AudioPlayer from '../api.js';
import dispatcher from '../../core/dispatcher.js';
import PlayerActions from '../../player/actions.js';
import { appState } from '../../core/state.js';
import { logError } from '../../core/utils.js';

class PlayerController extends React.Component {
  constructor(props) {
    super(props);
    this.state = appState.getState();
  }

  componentDidMount() {
    this.audioPlayer = new AudioPlayer();
    window.audioPlayer = this.audioPlayer;
  }

  componentDidUpdate() {
    let currentSong = _.first(this.state.queue);
    if (this.state.isPlaying && !_.isEmpty(currentSong)) {
      this.audioPlayer.play(currentSong.url);
    }
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
    let action = PlayerActions.nextSong();
    dispatcher.dispatch(action);
  }

  prevSong() {
    let action = PlayerActions.prevSong();
    dispatcher.dispatch(action);
  }

  render() {
    return (
      <div className="player-container">
        <Iframe />
        <Player
          song={this.state.currentSong}
          playSong={this.playSong.bind(this)}
          pauseSong={this.pauseSong.bind(this)}
          nextSong={this.nextSong.bind(this)}
          prevSong={this.prevSong.bind(this)} />
      </div>
    );
  }
}

export default PlayerController;
