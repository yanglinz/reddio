import _ from 'lodash';
import { takeLatest } from 'redux-saga';
import { fork, put } from 'redux-saga/effects';

import { REDDIT_ACTIONS, REDDIT_SORT_TYPES, REDDIT_SORT_RANGES } from 'reddit/constants';
import { routePathParams } from 'core/routes';

export function* requestPosts(action) {
  const { payload } = action || {};
  const pathParams = routePathParams(payload.pathname);
  const { subreddit, sortType, sortRange } = pathParams || {};

  const isValidSubreddit = !_.isEmpty(subreddit);
  const isValidSortType = _.includes(REDDIT_SORT_TYPES, sortType);
  const isValidSortRange = (
    (sortType !== REDDIT_SORT_TYPES.top && _.isEmpty(sortRange)) ||
    _.includes(REDDIT_SORT_RANGES, sortRange));

  const isValidParams = isValidSubreddit && isValidSortType && isValidSortRange;
  if (isValidParams) {
    yield put({
      type: REDDIT_ACTIONS.REQUEST_POSTS,
      payload: { subreddit, sortType, sortRange }
    });
  }
}

const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export function* watchRouteChange() {
  yield* takeLatest(ROUTER_LOCATION_CHANGE, requestPosts);
}

export function* fetchPosts(action) {
  const { payload } = action;
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
