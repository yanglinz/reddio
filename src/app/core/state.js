import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';

import { playerReducer } from 'player/state.js';
import config from 'core/config.js';

export function rootReducer() {
  return combineReducers({ player: playerReducer });
}

export function configureStore(initialState) {
  const loggerMiddleware = createLogger({ predicate: () => !config.IS_PROD });
  const middleware = applyMiddleware(thunkMiddleware, promiseMiddleware, loggerMiddleware);
  return createStore(rootReducer(), initialState, middleware);
}

const store = configureStore();
export default store;
