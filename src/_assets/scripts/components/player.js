/* eslint react/sort-comp: 0, react/prop-types: 0 */

import Marty from 'marty';
import React from 'react';
import PlayerStore from '../stores/playerStore.js';
import PlayerAction from '../actions/playerAction.js';
import AudioPlayer from '../lib/audio.js';

let styles = {
  next: {
    color: '#999999'
  },
  prev: {
    color: '#aaaaaa'
  }
};

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isPlaying: false
    };
  }

  componentDidMount() {
    this.audioPlayer = new AudioPlayer();
    this.audioPlayer.load();
  }

  componentDidUpdate() {
    this.playSong();
  }

  playSong() {
    this.audioPlayer.play(this.props.currentSong.url);
  }

  nextSong() {
    PlayerAction.nextSong();
  }

  prevSong() {
    PlayerAction.prevSong();
  }

  render() {
    return (
      <div className="player">
        <div id="audio">
          <div id="audio_iframes">
            <div id="youtube">
              <div id="youtube_player"></div>
            </div>

            <div id="soundcloud">
              <iframe
                id="soundcloud_player"
                width="100%" height="150"
                scrolling="no"
                frameborder="no"
                src="https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1848538&show_artwork=true">
              </iframe>
            </div>
          </div>
          <div id="audio_player"></div>
        </div>

        <div className="controls">
          <p className="next" style={styles.next} onClick={this.nextSong.bind(this)}>Next song</p>
          <p className="prev" style={styles.prev} onClick={this.prevSong.bind(this)}>Prev song</p>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  currentSong: React.PropTypes.string
};

let PlayerContainer = Marty.createContainer(Player, {
  listenTo: PlayerStore,
  fetch: {
    currentSong() {
      return PlayerStore.getCurrentSong();
    }
  }
});

export default PlayerContainer;
