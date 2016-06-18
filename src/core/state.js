import { applyMiddleware, combineReducers, createStore } from 'redux';
import createLogger from 'redux-logger';
import createSaga from 'redux-saga';
import { fork } from 'redux-saga/effects';

import { applyReducers } from 'core/stream.js';
import { playerReducer } from 'player/state.js';
import { coreSaga } from 'core/saga.js';
import settings from 'core/settings.js';

export function rootReducer() {
  return combineReducers({ player: playerReducer });
}

export function* rootSaga() {
  yield [
    fork(coreSaga)
  ];
}

export function configureStream(store) {
  const sinkStream$ = applyReducers();
  sinkStream$.subscribe((action) => store.dispatch(action));
}

export function isLoggerEnabled() {
  const isLocal = !settings.IS_PROD;
  const isKarma = window !== window.top;
  return isLocal && !isKarma;
}

export function configureStore(initialState) {
  const loggerMiddleware = createLogger({ predicate: isLoggerEnabled });
  const sagaMiddleware = createSaga();
  const middleware = applyMiddleware(sagaMiddleware, loggerMiddleware);
  const store = createStore(rootReducer(), initialState, middleware);
  sagaMiddleware.run(rootSaga);
  configureStream(store);
  return store;
}

const store = configureStore();
export default store;
