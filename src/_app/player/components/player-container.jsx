import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Player from 'player/components/player.jsx';

@connect(state => ({
  isPlaying: state.player.isPlaying,
  activeSong: state.player.activeSong,
  queue: state.player.queue
}))
class PlayerContainer extends Component {
  render() {
    return (
      <Player
        isPlaying={this.props.isPlaying}
        activeSong={this.props.activeSong}
        queue={this.props.queue}
        dispatch={this.props.dispatch} />
    );
  }
}

PlayerContainer.propTypes = {
  isPlaying: PropTypes.bool,
  activeSong: PropTypes.object,
  queue: PropTypes.array,
  dispatch: PropTypes.func
};

export default PlayerContainer;
