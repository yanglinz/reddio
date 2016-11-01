import React from 'react';
import { connect } from 'react-redux';

import * as action from 'player/action';

import './player.scss';

function stateToProps(state) {
  return {
    foo: 'bar'
  };
}

export function Player(props) {
  const { dispatch } = props;
  const pausePlayer = dispatch.bind(null, action.pausePlayer());
  return (
    <div className="player">
      <p>play</p>
      <p onClick={pausePlayer}>pause</p>
    </div>
  );
}

module.exports = connect(stateToProps)(Player);
