import React from 'react';
import { BaseViewComponent } from '../wrappers/index.js';

class Player extends BaseViewComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="player">
        <div className="controls">
          <div className="song-control">
            <p className="play" onClick={this.props.playSong}>Play song</p>
            <p className="pause" onClick={this.props.pauseSong}>Pause song</p>
            <p className="next" onClick={this.props.nextSong}>Next song</p>
            <p className="prev" onClick={this.props.prevSong}>Prev song</p>
          </div>

          <div className="song-status">
            <div className="song-title">
            </div>

            <div className="progress">
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
