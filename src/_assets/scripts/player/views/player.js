import React from 'react';
import { IconButton, FontIcon, Slider } from 'material-ui';
import { BaseViewComponent } from '../../core/views/index.js';

class Player extends BaseViewComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="player">
        <div className="controls">
          <div className="song-progress">
            <Slider name="slider3" defaultValue={1} />
          </div>

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
