import { takeLatest } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';

import { PLAYER_ACTIONS } from 'player/constants';
import { load } from 'player/controls';

export function* initializePlayer() {
  yield put({ type: PLAYER_ACTIONS.LOAD_IFRAME });
  try {
    yield call(load);
    yield put({ type: PLAYER_ACTIONS.LOAD_IFRAME_DONE });
  } catch (e) {
    yield put({ type: PLAYER_ACTIONS.LOAD_IFRAME_FAIL });
  }
}

export function* playerSaga() {
  yield [
    fork(initializePlayer),
  ];
}
