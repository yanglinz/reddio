import React, { Component, PropTypes } from 'react';
import { IconButton } from 'material-ui';
import materialUI from 'core/components/decorators/material-ui.js';
import { setToPlay, setToPause } from 'player/state/actions.js';

@materialUI
class PlayerControls extends Component {
  handleClickPlay() {
    this.props.dispatch(setToPlay());
  }

  handleClickPause() {
    this.props.dispatch(setToPause());
  }

  render() {
    let playButton;
    if (this.props.isPlaying) {
      playButton = (
        <IconButton
          onClick={this.handleClickPause.bind(this)}
          iconClassName="material-icons">
          pause
        </IconButton>
      );
    } else {
      playButton = (
        <IconButton
          onClick={this.handleClickPlay.bind(this)}
          iconClassName="material-icons">
          play_arrow
        </IconButton>
      );
    }
    return (
      <div className="player-controls">
        <h2>Controls</h2>
        <IconButton iconClassName="material-icons">fast_rewind</IconButton>
        {playButton}
        <IconButton iconClassName="material-icons">fast_forward</IconButton>
      </div>
    );
  }
}

PlayerControls.propTypes = {
  isPlaying: PropTypes.bool,
  dispatch: PropTypes.func
};

export default PlayerControls;
