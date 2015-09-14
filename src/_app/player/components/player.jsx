import React, { Component, PropTypes } from 'react';
import PlayerControls from 'player/components/player-controls.jsx';
import PlayerStatus from 'player/components/player-status.jsx';
import PlayerUtility from 'player/components/player-utility.jsx';
import './player.css';

class Player extends Component {
  render() {
    const { activeSong } = this.props;
    return (
      <div className="player">
        <PlayerControls
          isPlaying={this.props.isPlaying}
          dispatch={this.props.dispatch} />
        <PlayerStatus activeSong={activeSong} />
        <PlayerUtility activeSong={activeSong} />
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
