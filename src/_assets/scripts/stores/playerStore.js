var Marty = require('marty');
var playerConstants = require('../constants/playerConstants.js');

var playerStore = Marty.createStore({
  id: 'PlayerStore',

  handlers: {
    playSong: playerConstants.PLAY_SONG
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

module.exports = playerStore;
