import { noop } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Player from 'player/components/player.jsx';
import PlayerIframe from 'player/components/player-iframe.js';
import AudioPlayer from 'player/api.js';
import { playNextSong } from 'player/state/actions.js';
import { isSoundcloud, isYoutube } from 'reddit/api.js';
import { logError } from 'core/logger.js';
import './player-container.css';

@connect(state => ({
  isPlaying: state.player.isPlaying,
  activeSong: state.player.activeSong,
  songs: state.player.songs
}))
class PlayerContainer extends Component {
  componentDidMount() {
    this.audioPlayer = new AudioPlayer();
    this.audioPlayer.loadSoundcloud();
    this.audioPlayer.loadYoutube();

    const playerStream = this.audioPlayer.getStream();
    this.onPlayerStateChange(playerStream);
  }

  componentDidUpdate(prevProps) {
    this.handlePlaySong(prevProps);
    this.handlePauseSong(prevProps);
  }

  shouldRenderYoutube() {
    const { activeSong } = this.props;
    return activeSong && isYoutube(activeSong.url);
  }

  shouldRenderSoundcloud() {
    const { activeSong } = this.props;
    return activeSong && isSoundcloud(activeSong.url);
  }

  onPlayerStateChange(playerEventStream) {
    const playerStates = {
      ENDED: 'ENDED',
      PLAYING: 'PLAYING',
      PAUSED: 'PAUSED'
    };
    playerEventStream.subscribe((event) => {
      switch (event) {
      case playerStates.ENDED:
        this.onPlayerStateEnded();
        break;
      case playerStates.PLAYING:
        this.onPlayerStatePlaying();
        break;
      case playerStates.PAUSED:
        this.onPlayerStatePaused();
        break;
      default:
        break;
      }
    }, logError);
  }

  onPlayerStateEnded() {
    const { dispatch } = this.props;
    dispatch(playNextSong());
  }

  onPlayerStatePlaying() {
    noop();
  }

  onPlayerStatePaused() {
    noop();
  }

  handlePlaySong(prevProps) {
    const { activeSong: prevActiveSong } = prevProps;
    const { activeSong } = this.props;
    const isNewSong = !(activeSong.id === prevActiveSong.id);
    if (isNewSong) {
      this.audioPlayer.play(activeSong.url);  // load new song
    }
  }

  handlePauseSong(prevProps) {
    const { isPlaying: prevIsPlaying } = prevProps;
    const { isPlaying, activeSong } = this.props;
    if (prevIsPlaying && !isPlaying) {
      this.audioPlayer.pause();  // pause song
    }

    if (!prevIsPlaying && isPlaying) {
      this.audioPlayer.play(activeSong.url);  // unpause song
    }
  }

  render() {
    return (
      <div className="player-container">
        <Player
          isPlaying={this.props.isPlaying}
          activeSong={this.props.activeSong}
          songs={this.props.songs}
          dispatch={this.props.dispatch} />

        <div className="player-iframes">
          <PlayerIframe
            isActive={this.shouldRenderYoutube()}
            mountNode="youtube-mount-node" />
          <PlayerIframe
            isActive={this.shouldRenderSoundcloud()}
            mountNode="soundcloud-mount-node" />
        </div>
      </div>
    );
  }
}

PlayerContainer.propTypes = {
  isPlaying: PropTypes.bool,
  activeSong: PropTypes.object,
  songs: PropTypes.array,
  dispatch: PropTypes.func
};

export default PlayerContainer;
