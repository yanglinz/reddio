var _ = require('lodash');
var Marty = require('marty');
var songsConstants = require('../constants/songsConstants.js');

var SongsStore = Marty.createStore({
  id: 'SongsStore',

  handlers: {
    receiveSongs: songsConstants.RECEIVE_SONGS
  },

  getInitialState () {
    return {
      hotSongs: [],
      topSongs: [],
      newSongs: [],
      activeSongs: 'hotSongs'
    };
  },

  getSongs () {
    return this.state[this.state.activeSongs];
  },

  receiveSongs (listingType, songs) {
    this.state[listingType] = this.state[listingType].concat(songs);
    console.log(this.state);
    this.hasChanged();
  }
});

module.exports = SongsStore;
