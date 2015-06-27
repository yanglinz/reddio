import GetPlayerReducer from './state/reducers/player.js';
import { StorageKeys, appState } from './state/state.js';

function getStorageKey(actionType) {
  return StorageKeys.PLAYER_STORAGE_KEY;
}

function getReducer(action) {
  return GetPlayerReducer(action);
}

const Dispatcher = {
  dispatch(action) {
    let storageKey = getStorageKey(action.type);
    let reducer = getReducer(action);
    appState.apply(storageKey, reducer);
  }
};

export default Dispatcher;
