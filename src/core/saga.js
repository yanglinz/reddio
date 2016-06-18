import { put } from 'redux-saga/effects';

import { CORE_EVENTS } from 'core/constants.js';

export function* initializeSaga() {
  const initializeSagaEvent = { type: CORE_EVENTS.SAGA_INITIALIZED };
  yield put(initializeSagaEvent);
}

export function* coreSaga() {
  yield* initializeSaga();
}
