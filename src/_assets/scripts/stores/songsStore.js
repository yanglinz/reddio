import Marty from 'marty';
import SongsConstants from '../constants/songsConstants.js';

let SongsStore = Marty.createStore({
  id: 'SongsStore',

  getInitialState() {
    return {
      hot: [],
      top: [],
      new: [],
      activeType: 'hot'
    };
  },

  handlers: {
    receiveSongs: SongsConstants.RECEIVE_SONGS
  },

  getSongs() {
    return this.state[this.state.activeType];
  },

  receiveSongs(listingType, songs) {
    this.state[listingType] = this.state[listingType].concat(songs);
    this.hasChanged();
  }
});

export default SongsStore;
