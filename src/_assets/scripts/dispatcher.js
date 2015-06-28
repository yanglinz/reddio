import _ from 'lodash';
import RSVP from 'rsvp';
import { logError } from './lib/logger.js';
import { PlayerActionTypes, RedditActionTypes } from './actions/action.constants.js';
import GetPlayerReducer from './state/reducers/player.js';
import GetRedditReducer from './state/reducers/reddit.js';
import { StorageKeys, appState } from './state/state.js';

function getReducer(action) {
  let storageKey, reducer;

  if (!action.type) {
    return logError('Action missing type');
  }

  if (_.includes(PlayerActionTypes, action.type)) {
    storageKey = StorageKeys.PLAYER_STORAGE_KEY;
    reducer = GetPlayerReducer(action);
    return [storageKey, reducer];
  }

  if (_.includes(RedditActionTypes, action.type)) {
    storageKey = StorageKeys.REDDIT_STORAGE_KEY;
    reducer = GetRedditReducer(action);
    return [storageKey, reducer];
  }

  return logError(`No matching storage key found for action type: ${action.type}`);
}

const Dispatcher = {
  dispatch(action) {
    if (_.isFunction(action.payload.then)) {  // if the action's payload is a promise
      action.payload.then(function (asyncPayload) {
        let resolvedAction = _.extend(action, {payload: asyncPayload});
        let [storageKey, reducer] = getReducer(resolvedAction);
        appState.apply(storageKey, reducer);
      });
    } else {
      let [storageKey, reducer] = getReducer(action);
      appState.apply(storageKey, reducer);
    }
  }
};

export default Dispatcher;
