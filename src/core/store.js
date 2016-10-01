import { applyMiddleware, combineReducers, createStore } from 'redux';
import createLogger from 'redux-logger';
import createSaga from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { routerReducer } from 'react-router-redux';

import { applyReducers } from 'core/stream';
import { playerReducer } from 'player/reducer';
import { redditReducer } from 'reddit/reducer';
import { coreSaga } from 'core/saga';
import { redditSaga } from 'reddit/saga';
import settings from 'core/settings';

export function rootReducer() {
  return combineReducers({
    routing: routerReducer,
    player: playerReducer,
    reddit: redditReducer
  });
}

export function* rootSaga() {
  yield [
    fork(coreSaga),
    fork(redditSaga)
  ];
}

export function configureStream(store) {
  const sinkStream$ = applyReducers();
  sinkStream$.subscribe(action => store.dispatch(action));
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
