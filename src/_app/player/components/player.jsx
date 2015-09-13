import React, { Component, PropTypes } from 'react';
import PlayerControls from 'player/components/player-controls.jsx';
import './player.css';

class Player extends Component {
  render() {
    const { activeSong, songs } = this.props;
    return (
      <div className="player">
        <h2>Player</h2>
        <h4>{activeSong.title} is currently playing</h4>
        <h4>{songs.length} songs in pool</h4>
        <PlayerControls
          isPlaying={this.props.isPlaying}
          dispatch={this.props.dispatch} />
      </div>
    );
  }
}

Player.propTypes = {
  isPlaying: PropTypes.bool,
  activeSong: PropTypes.object.isRequired,
  songs: PropTypes.array.isRequired,
  dispatch: PropTypes.func
};

export default Player;
