'use strict';

import _ from 'lodash';
import Marty from 'marty';
import songsConstants from '../constants/songsConstants.js';

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

export default SongsStore;
