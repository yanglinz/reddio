import PlayerReducer from './state/reducers/player.js';
import { StorageKeys, appState } from './state/state.js';

function getStorageKey(actionType) {
  return StorageKeys.PLAYER_STORAGE_KEY;
}

function getReducer(actionType) {
  return PlayerReducer;
}

const Dispatcher = {
  dispatch(action) {
    let storageKey = getStorageKey(action.type);
    let reducer = getReducer(action.type);
    let stateTransformer = reducer[action.type];
    appState.apply(storageKey, stateTransformer);
  }
};

export default Dispatcher;
