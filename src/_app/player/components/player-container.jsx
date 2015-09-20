import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Player from 'player/components/player.jsx';
import PlayerIframe from 'player/components/player-iframe.js';
import AudioPlayer, { Utilities } from 'player/api.js';
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
  }

  componentDidUpdate(prevProps) {
    this.handlePlaySong(prevProps);
  }

  shouldRenderYoutube() {
    const { activeSong, isPlaying } = this.props;
    return isPlaying && activeSong && Utilities.urlIsYoutube(activeSong.url);
  }

  shouldRenderSoundcloud() {
    const { activeSong, isPlaying } = this.props;
    return isPlaying && activeSong && Utilities.urlIsSoundcloud(activeSong.url);
  }

  handlePlaySong(prevProps) {
    const { activeSong: prevActiveSong } = prevProps;
    const { activeSong } = this.props;
    const isNewSong = !(activeSong.id === prevActiveSong.id);
    if (isNewSong) {
      this.audioPlayer.play(activeSong.url);
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
