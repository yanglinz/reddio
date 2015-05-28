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
    playSong: PlayerConstants.PLAY_SONG
  },

  getCurrentSong() {
    return _.first(this.state.queue)
  },

  playSong(song, activeSongs) {
    let index = _.indexOf(activeSongs, song);
    this.state.queue = _.drop(activeSongs, index);
    this.hasChanged();
  }
});

export default PlayerStore;
