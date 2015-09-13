import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Player from 'player/components/player.jsx';

@connect(state => ({
  activeSong: state.player.activeSong,
  queue: state.player.queue
}))
class PlayerContainer extends Component {
  render() {
    return (
      <Player
        activeSong={this.props.activeSong}
        queue={this.props.queue} />
    );
  }
}

PlayerContainer.propTypes = {
  activeSong: PropTypes.object,
  queue: PropTypes.array
};

export default PlayerContainer;
