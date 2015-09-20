import React, { Component, PropTypes } from 'react';

class PlayerStatus extends Component {
  render() {
    const { activeSong } = this.props;
    return (
      <div className="player-status">
        <div className="song-status">
          <h4>{activeSong.title}</h4>
          <p>{activeSong.url}</p>
        </div>
      </div>
    );
  }
}

PlayerStatus.propTypes = {
  activeSong: PropTypes.object.isRequired
};

export default PlayerStatus;
