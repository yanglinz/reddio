import _ from 'lodash';
import Marty from 'marty';
import PlayerConstants from '../constants/playerConstants.js';

let PlayerStore = Marty.createStore({
  id: 'PlayerStore',

  getInitialState() {
    return {
      queue: [],
      history: []
    };
  },

  handlers: {
    playSong: PlayerConstants.PLAY_SONG,
    playNextSong: PlayerConstants.PLAY_NEXT_SONG,
    playPrevSong: PlayerConstants.PLAY_PREV_SONG
  },

  getCurrentSong() {
    return _.first(this.state.queue)
  },

  playSong(song, activeSongs) {
    let index = _.indexOf(activeSongs, song);
    this.state.queue = _.drop(activeSongs, index);
    this.hasChanged();
  },

  playNextSong() {
    this.state.history = [].concat(_.take(this.state.queue)).concat(this.state.history);
    this.state.queue = _.drop(this.state.queue);
    this.hasChanged();
  },

  playPrevSong() {
    this.state.queue = [].concat(_.take(this.state.history)).concat(this.state.queue);
    this.state.history = _.drop(this.state.history);
    this.hasChanged();
  }

});

export default PlayerStore;
