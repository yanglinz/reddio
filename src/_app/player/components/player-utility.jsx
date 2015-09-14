import React, { Component, PropTypes } from 'react';
import { Avatar } from 'material-ui';
import materialUI from 'core/components/decorators/material-ui.js';

@materialUI
class PlayerUtility extends Component {
  render() {
    const { activeSong } = this.props;
    return (
      <div className="player-utility">
        <div className="song-thumbnail">
          <Avatar src={activeSong.thumbnail} />
        </div>
      </div>
    );
  }
}

PlayerUtility.propTypes = {
  activeSong: PropTypes.object.isRequired
};

export default PlayerUtility;
