import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';

import { applyReducers } from 'core/stream.js';
import { playerReducer } from 'player/state.js';
import config from 'core/config.js';

export function rootReducer() {
  return combineReducers({ player: playerReducer });
}

export function configureStream(store) {
  const sinkStream$ = applyReducers();
  sinkStream$.subscribe((action) => store.dispatch(action));
}

export function configureStore(initialState) {
  const loggerMiddleware = createLogger({ predicate: () => !config.IS_PROD });
  const middleware = applyMiddleware(thunkMiddleware, promiseMiddleware, loggerMiddleware);
  const store = createStore(rootReducer(), initialState, middleware);
  configureStream(store);
  return store;
}

const store = configureStore();
export default store;
