import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import redditReducer from 'reddit/state/reducer.js';
import playerReducer from 'player/state/reducer.js';
import settings from 'core/settings.js';

const reducer = combineReducers({
  reddit: redditReducer,
  player: playerReducer
});

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
  predicate: settings.IS_DEV
});

const createStoreWithMiddleware = applyMiddleware(
  loggerMiddleware
)(createStore);

function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}

export default configureStore;
