import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'player/actions';
import { selectIsPlaying } from 'player/reducer';
import Player from 'player/components/player';

function stateToProps(state) {
  return {
    isPlaying: selectIsPlaying(state),
  };
}

export function PlayerContainer(props) {
  const { dispatch } = props;
  const pauseCommand = dispatch.bind(null, actions.pauseCommand());
  return (
    <div className="PlayerContainer">
      <Player pauseCommand={pauseCommand} {...props} />
    </div>
  );
}

PlayerContainer.propTypes = {
  dispatch: React.PropTypes.func,
};

module.exports = connect(stateToProps)(PlayerContainer);
