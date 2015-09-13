import React, { Component, PropTypes } from 'react';
import PlayerControls from 'player/components/player-controls.jsx';
import './player.css';

class Player extends Component {
  render() {
    const { activeSong, queue } = this.props;
    return (
      <div className="player">
        <h2>Player</h2>
        <h4>{activeSong.title} is currently playing</h4>
        <h4>{queue.length} songs are upcoming</h4>
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
  queue: PropTypes.array.isRequired,
  dispatch: PropTypes.func
};

export default Player;
