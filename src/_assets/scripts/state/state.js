import _ from 'lodash';
import Rx from 'rx';
import { PlayerActionTypes } from '../actions/action.constants.js';

export let appStateStream = new Rx.Subject();

export const StorageKeys = {
  PLAYER_STORAGE_KEY: 'player',
  REDDIT_STORAGE_KEY: 'reddit'
};

const initialState = _.reduce(StorageKeys, function formatInitialState(memo, storageKey) {
  memo[storageKey] = {};
  return memo;
}, {});

export let appState = {
  state: _.extend({}, initialState),

  apply(key, transformer) {
    this.state[key] = transformer(this.state[key]);
    // TODO: Use immutable.js to determine if this.hasChanged should be fired
    this.hasChanged();
  },

  hasChanged() {
    console.log('appState has changed');
  },

  getState(key) {
    // do something with key
    return this.state[StorageKeys.REDDIT_STORAGE_KEY];
  }
};
