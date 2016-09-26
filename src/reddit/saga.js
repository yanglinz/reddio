import { takeLatest } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';

import { REDDIT_ACTIONS } from 'reddit/constants';
import * as api from 'reddit/api';

export function* requestPosts(action) {
  const { pathname, query } = action.payload;
  const payload = { pathname, query };
  yield put({ type: REDDIT_ACTIONS.REQUEST_POSTS, payload });
}

const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export function* watchRouteChange() {
  yield* takeLatest(ROUTER_LOCATION_CHANGE, requestPosts);
}

export function* fetchPosts(action) {
  const { pathname, query } = action.payload;
  try {
    const response = yield call(api.getListing, pathname, query);
    const payload = { pathname, query, response };
    yield put({ type: REDDIT_ACTIONS.RECEIVE_POSTS, payload });
  } catch (err) {
    const payload = { pathname, query };
    yield put({ type: REDDIT_ACTIONS.FETCH_POSTS_ERROR, payload });
  }
}

export function* watchRequestPosts() {
  yield* takeLatest(REDDIT_ACTIONS.REQUEST_POSTS, fetchPosts);
}

export function* redditSaga() {
  yield [
    fork(watchRouteChange),
    fork(watchRequestPosts)
  ];
}
