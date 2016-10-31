import { takeLatest } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';

export function* initializePlayer() {
  console.log('initalizePlayer');
  // const initializedEvent = { type: CORE_EVENTS.SAGA_INITIALIZED };
  // yield put(initializedEvent);
}

export function* playerSaga() {
  yield [
    fork(initializePlayer),
  ];
}
