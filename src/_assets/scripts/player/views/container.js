import _ from 'lodash';
import React from 'react';
import { IconButton, FontIcon, Slider } from 'material-ui';
import { BaseViewComponent } from '../wrappers/index.js';

class Player extends BaseViewComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="player">
        <div className="iframe-mounts">
          <div className="youtube-mount"></div>
          <div className="soundcloud-mount"></div>
        </div>

        <div className="controls">
          <div className="song-control">
            <span className="song-control-button" onClick={this.props.prevSong}>
              <IconButton>
                <FontIcon className="material-icons">skip_previous</FontIcon>
              </IconButton>
            </span>

            <span className="song-control-button" onClick={this.props.playSong}>
              <IconButton>
                <FontIcon className="material-icons">play_arrow</FontIcon>
              </IconButton>
            </span>

            <span className="song-control-button" onClick={this.props.pauseSong}>
              <IconButton>
                <FontIcon className="material-icons">pause</FontIcon>
              </IconButton>
            </span>

            <span className="song-control-button" onClick={this.props.nextSong}>
              <IconButton>
                <FontIcon className="material-icons">skip_next</FontIcon>
              </IconButton>
            </span>
          </div>

          <div className="song-status">
            <div className="song-title">
            </div>

            <div className="progress">
              <Slider name="slider3" defaultValue={1} />
            </div>
          </div>

          <div className="player-control">
            <div className="volume">
            </div>

            <div className="shuffle">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  song: React.PropTypes.object.isRequired,
  playSong: React.PropTypes.func.isRequired,
  pauseSong: React.PropTypes.func.isRequired,
  nextSong: React.PropTypes.func.isRequired,
  prevSong: React.PropTypes.func.isRequired
};

export default Player;
