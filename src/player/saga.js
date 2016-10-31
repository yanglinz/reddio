import { takeLatest } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';

import { load } from 'player/controls';

export function* initializePlayer() {
  yield call(load);
}

export function* playerSaga() {
  yield [
    fork(initializePlayer),
  ];
}
