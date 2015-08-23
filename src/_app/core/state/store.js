import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import playerReducer from 'player/state/reducer.js';

const reducer = combineReducers({
  player: playerReducer
});

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
  predicate: true  // TODO: make this an environmental variable
});

const createStoreWithMiddleware = applyMiddleware(
  loggerMiddleware
)(createStore);

function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}

export default configureStore;
