'use strict';

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
      'hot': [],
      'top': [],
      'new': [],
      activeType: 'hot'
    };
  },

  getSongs () {
    return this.state[this.state.activeType];
  },

  receiveSongs (listingType, songs) {
    this.state[listingType] = this.state[listingType].concat(songs);
    this.hasChanged();
  }
});

module.exports = SongsStore;
