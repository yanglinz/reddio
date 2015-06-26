import _ from 'lodash';
import Marty from 'marty';
import NavConstants from '../constants/navConstants.js';

let NavStore = Marty.createStore({
  id: 'NavStore',

  getInitialState() {
    return {
      activeSortType: 'hot'
    };
  },

  handlers: {
    setActiveSortType: NavConstants.SET_ACTIVE_SORT_TYPE
  },

  getSortTypes() {
    return [
      'hot',
      'top',
      'new',
      'random'
    ];
  },

  setActiveSortType(sortType) {
    const defaultSortType = 'hot';
    const possibleSortTypes = this.getSortTypes();
    let sortTypeMatch = _.findWhere(possibleSortTypes, sortType);
    this.state.activeSortType = sortTypeMatch || defaultSortType;
  },

  getActiveSortType() {
    return this.state.activeSortType;
  }
});

export default NavStore;
