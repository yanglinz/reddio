import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import createSaga from 'redux-saga';

import { rootReducer } from 'core/reducer';
import { rootSaga } from 'core/saga';
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
  const middleware = applyMiddleware(sagaMiddleware, loggerMiddleware);
  const store = createStore(rootReducer(), initialState, middleware);
  sagaMiddleware.run(rootSaga);
  return store;
}

const store = configureStore();
export default store;
