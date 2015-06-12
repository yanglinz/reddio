import Marty from 'marty';
import SongsConstants from '../constants/songsConstants.js';
import NavStore from './navStore.js';

let SongsStore = Marty.createStore({
  id: 'SongsStore',

  getInitialState() {
    let sortTypes = NavStore.getSortTypes();
    let songs = _.reduce(sortTypes, function createSongsLists(memo, sortType) {
      memo[sortType] = [];
      return memo;
    }, {});

    return {
      songs: songs,
      activeSortType: NavStore.getActiveSortType()
    };
  },

  handlers: {
    receiveSongs: SongsConstants.RECEIVE_SONGS,
    setActiveSortType: SongsConstants.SET_ACTIVE_SORT_TYPE
  },

  getSongs() {
    return this.state.songs[this.state.activeSortType];
  },

  receiveSongs(sortType, songs) {
    this.state.songs[sortType] = this.state.songs[sortType] || [];
    this.state.songs[sortType] = this.state.songs[sortType].concat(songs);
    this.hasChanged();
  },

  getActiveSortType() {
    return this.state.activeSortType;
  },

  setActiveSortType(sortType) {
    this.state.activeSortType = sortType;
    this.hasChanged();
  }
});

export default SongsStore;
