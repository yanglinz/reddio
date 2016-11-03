import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import createSaga from 'redux-saga';
import { createEpicMiddleware } from 'redux-observable';

import { rootReducer } from 'core/reducer';
import { rootSaga } from 'core/saga';
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
  const sagaMiddleware = createSaga();
  const middleware = applyMiddleware(
    thunk,
    sagaMiddleware,
    createEpicMiddleware(rootEpic),
    loggerMiddleware,
  );
  const store = createStore(rootReducer(), initialState, middleware);
  sagaMiddleware.run(rootSaga);
  return store;
}

const store = configureStore();
export default store;
