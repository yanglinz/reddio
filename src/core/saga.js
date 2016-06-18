import { fork, put } from 'redux-saga/effects';

import { CORE_EVENTS } from 'core/constants.js';

export function* initializeSaga() {
  const initializedEvent = { type: CORE_EVENTS.SAGA_INITIALIZED };
  yield put(initializedEvent);
}

export function* coreSaga() {
  yield [
    fork(initializeSaga)
  ];
}
