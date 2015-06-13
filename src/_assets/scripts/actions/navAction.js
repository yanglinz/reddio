import Marty from 'marty';
import NavConstants from '../constants/navConstants.js';

let PlayerAction = Marty.createQueries({
  id: 'NavAction',

  setActiveSortType: function dispatchActiveSortType(sortType) {
    this.dispatch(NavConstants.SET_ACTIVE_SORT_TYPE, sortType);
  }
});

export default PlayerAction;
