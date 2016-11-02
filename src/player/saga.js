import { takeLatest } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';

import { REDDIT_ACTIONS } from 'reddit/constants';
import { PLAYER_ACTIONS } from 'player/constants';
import { load, play, pause } from 'player/controls';

export function* initializePlayer() {
  yield put({ type: PLAYER_ACTIONS.LOAD_IFRAME });
  try {
    yield call(load);
    yield put({ type: PLAYER_ACTIONS.LOAD_IFRAME_DONE });
  } catch (e) {
    yield put({ type: PLAYER_ACTIONS.LOAD_IFRAME_FAIL });
  }
}

export function* playPost(action) {
  const { payload } = action;
  const { url } = payload.post.data;
  yield call(play, url);
}

export function* watchPlayPost() {
  yield* takeLatest(REDDIT_ACTIONS.PLAY_POST, playPost);
}

export function* pausePlayer() {
  yield call(pause);
}

export function* watchPausePlayer() {
  yield* takeLatest(PLAYER_ACTIONS.PAUSE_PLAYER, pausePlayer);
}

export function* playerSaga() {
  yield [
    fork(initializePlayer),
    fork(watchPlayPost),
    fork(watchPausePlayer),
  ];
}
