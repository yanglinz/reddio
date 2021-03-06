import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'state/player/actions';
import { selectIsPlaying, selectCurrentPost } from 'state/player/reducer';
import Player from 'screens/App/components/Player';

function stateToProps(state) {
  return {
    isPlaying: selectIsPlaying(state),
    currentPost: selectCurrentPost(state),
  };
}

export function PlayerContainer(props) {
  const { dispatch } = props;

  const pauseCommand = () => dispatch(actions.pauseCommand());
  const unpauseCommand = () => dispatch(actions.unpauseCommand());
  const nextCommand = () => dispatch(actions.nextCommand());
  const prevCommand = () => dispatch(actions.prevCommand());

  const commands = {
    pauseCommand,
    unpauseCommand,
    nextCommand,
    prevCommand,
  };

  return (
    <div className="PlayerContainer">
      <Player {...commands} {...props} />
    </div>
  );
}

PlayerContainer.propTypes = {
  dispatch: React.PropTypes.func,
};

module.exports = connect(stateToProps)(PlayerContainer);
