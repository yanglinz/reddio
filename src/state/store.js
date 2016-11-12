import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

import settings from 'settings';
import { rootReducer } from './reducer';
import rootEpic from './epic';

export function isLoggerEnabled() {
  const isLocal = !settings.IS_PROD;
  const isKarma = window !== window.top;
  return isLocal && !isKarma;
}

export function configureStore(initialState) {
  const loggerMiddleware = createLogger({
    predicate: isLoggerEnabled,
    collapsed: true,
  });
  const middleware = applyMiddleware(
    createEpicMiddleware(rootEpic),
    loggerMiddleware,
  );
  const store = createStore(rootReducer(), initialState, middleware);
  return store;
}

const store = configureStore();
export default store;
