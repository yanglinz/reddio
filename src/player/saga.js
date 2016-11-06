import { takeLatest } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';

import { REDDIT_ACTIONS } from 'reddit/constants';
import { PLAYER_ACTIONS } from 'player/constants';
import { load, listen, play, pause } from 'player/controls';

export function* initializePlayer() {
  yield put({ type: PLAYER_ACTIONS.LOAD_IFRAME });
  try {
    yield call(load);
    yield put({ type: PLAYER_ACTIONS.LOAD_IFRAME_DONE });
  } catch (e) {
    yield put({ type: PLAYER_ACTIONS.LOAD_IFRAME_FAIL });
  }
}

export function addListeners(dispatch) {
  const onEvent = data => dispatch({
    type: PLAYER_ACTIONS.ON_EVENT,
    payload: data,
  });
  listen(onEvent);
}

export function* initializeListener() {
  yield take(PLAYER_ACTIONS.LOAD_IFRAME_DONE);
  yield put(addListeners);
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
  yield* takeLatest(PLAYER_ACTIONS.PAUSE_COMMAND, pausePlayer);
}

export function* playerSaga() {
  yield [
    fork(initializePlayer),
    fork(initializeListener),
    fork(watchPlayPost),
    fork(watchPausePlayer),
  ];
}
