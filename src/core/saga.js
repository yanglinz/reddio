import { fork, put } from 'redux-saga/effects';

import { CORE_EVENTS } from 'core/constants';

export function* initializeSaga() {
  const initializedEvent = { type: CORE_EVENTS.SAGA_INITIALIZED };
  yield put(initializedEvent);
}

export function* coreSaga() {
  yield [
    fork(initializeSaga)
  ];
}
