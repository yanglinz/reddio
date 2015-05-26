'use strict';

import Marty from 'marty';
import PlayerConstants from '../constants/playerConstants.js';

let PlayerStore = Marty.createStore({
  id: 'PlayerStore',

  getInitialState () {
    return {
      queue: [],
      currentSong: null
    };
  },

  handlers: {
    playSong: PlayerConstants.PLAY_SONG
  },

  getQueue () {
    return this.state.queue;
  },

  getCurrentSong () {
    return this.state.currentSong;
  },

  playSong (song) {
    this.state.currentSong = song;
    this.hasChanged();
  }
});

export default PlayerStore;
