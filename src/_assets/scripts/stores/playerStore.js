'use strict';

import Marty from 'marty';
import PlayerConstants from '../constants/playerConstants.js';

var PlayerStore = Marty.createStore({
  id: 'PlayerStore',

  handlers: {
    playSong: PlayerConstants.PLAY_SONG
  },

  getInitialState () {
    return {
      queue: [],
      currentSong: null
    };
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
