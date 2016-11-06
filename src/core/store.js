import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

import { rootReducer } from 'core/reducer';
import rootEpic from 'core/epic';
import settings from 'core/settings';

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
