/* eslint react/sort-comp: 0 */

import _ from 'lodash';
import React from 'react';
import Player from './player.js';
import Iframe from './iframes.js';
import AudioPlayer from '../api.js';
import dispatcher from '../../core/dispatcher.js';
import PlayerActions from '../../player/actions.js';
import { appState } from '../../core/state.js';

let styles = {
  hidden: {
    display: 'none'
  }
};

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

  isYoutubeActive() {
    const currentSong = _.first(this.state.queue) || {};
    const youtubeUrl = 'youtube.com';
    const youtubeShortUrl = 'youtu.be';
    return _.includes(currentSong.url, youtubeUrl) || _.includes(currentSong.url, youtubeShortUrl);
  }

  isSoundcloudActive() {
    let currentSong = _.first(this.state.queue) || {};
    const soundcloudUrl = 'soundcloud';
    return _.includes(currentSong.url, soundcloudUrl);
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
    const youtubeIframeStyle = this.isYoutubeActive() ? {} : styles.hidden;
    const soundcloudIframeStyle = this.isSoundcloudActive() ? {} : styles.hidden;

    return (
      <div className="player-container">
        <div className="iframe-container">
          <div className="youtube-container" style={youtubeIframeStyle}>
            <Iframe mountNodeId="youtube-mount-node" />
          </div>
          <div className="soundcloud-container" style={soundcloudIframeStyle}>
            <Iframe mountNodeId="soundcloud-mount-node" />
          </div>
        </div>

        <Player
          playSong={this.playSong.bind(this)}
          pauseSong={this.pauseSong.bind(this)}
          nextSong={this.nextSong.bind(this)}
          prevSong={this.prevSong.bind(this)} />
      </div>
    );
  }
}

export default PlayerController;
