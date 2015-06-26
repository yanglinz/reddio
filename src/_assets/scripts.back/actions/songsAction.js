import Marty from 'marty';
import SongsConstants from '../constants/songsConstants.js';

let SongsAction = Marty.createQueries({
  id: 'SongsAction',

  setActiveSortType: function setActiveSortType(sortType) {
    this.dispatch(SongsConstants.SET_ACTIVE_SORT_TYPE, sortType);
  }
});

export default SongsAction;
