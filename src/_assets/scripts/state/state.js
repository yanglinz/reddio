import _ from 'lodash';
import Rx from 'rx';
import { initialPlayerState } from './reducers/player.js';
import { initialRedditState } from './reducers/reddit.js';
import { logError } from '../lib/logger.js';

export const StorageKeys = {
  PLAYER_STORAGE_KEY: 'player',
  REDDIT_STORAGE_KEY: 'reddit'
};

export let appStateStream = new Rx.Subject();

export let appState = {
  state: {
    [StorageKeys.PLAYER_STORAGE_KEY]: initialPlayerState,
    [StorageKeys.REDDIT_STORAGE_KEY]: initialRedditState
  },

  apply(key, transformer) {
    let storageKey = this._getStorageKey(key);
    this.state[storageKey] = transformer(this.state[storageKey]);
    // TODO: Use immutable.js to determine if this.hasChanged should be fired
    appStateStream.onNext('CHANGED');
  },

  getState(key) {
    let storageKey = this._getStorageKey(key);
    return this.state[storageKey];
  },

  _getStorageKey(key) {
    key = (key || '').toLowerCase();

    if (_.includes(key, 'player')) {
      return StorageKeys.PLAYER_STORAGE_KEY;
    } else if (_.includes(key, 'reddit')) {
      return StorageKeys.REDDIT_STORAGE_KEY;
    } else {
      logError(`Storage key not found: given ${key}`);
    }
  }
};
