import React, { Component, PropTypes } from 'react';
import './player.css';

class Player extends Component {
  render() {
    const { activeSong, queue } = this.props;
    return (
      <div className="player">
        <h2>Player</h2>
        <h4>{activeSong.title} is currently playing</h4>
        <h4>{queue.length} songs are upcoming</h4>
      </div>
    );
  }
}

Player.propTypes = {
  activeSong: PropTypes.object.isRequired,
  queue: PropTypes.array.isRequired
};

export default Player;
