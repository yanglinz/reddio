import React from 'react';
import { connect } from 'react-redux';

import * as action from 'player/action';

import './player.scss';

function stateToProps() {
  return {};
}

export function Player(props) {
  const { dispatch } = props;
  const pauseCommand = dispatch.bind(null, action.pauseCommand());
  return (
    <div className="player">
      <button>play</button>
      <button onClick={pauseCommand}>pause</button>
    </div>
  );
}

Player.propTypes = {
  dispatch: React.PropTypes.func,
};

module.exports = connect(stateToProps)(Player);
