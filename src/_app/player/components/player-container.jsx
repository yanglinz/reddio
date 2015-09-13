import React, { Component } from 'react';
import { connect } from 'react-redux';
import Player from 'player/components/player.jsx';

@connect(state => (state))
class PlayerContainer extends Component {
  render() {
    return (
      <Player />
    );
  }
}

export default PlayerContainer;
