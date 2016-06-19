import _ from 'lodash';

import {
  REDDIT_SOURCES,
  REDDIT_ACTIONS,
  REDDIT_SORT_TYPES,
  REDDIT_SORT_RANGES
} from 'reddit/constants.js';

export function initialState() {
  return {
    sourceUrl: REDDIT_SOURCES.LISTEN_TO_THIS.url,
    posts: [],
    sortType: REDDIT_SORT_TYPES.HOT,
    sortRange: REDDIT_SORT_RANGES.DAY
  };
}

export function reduceSetSourceUrl(state, action) {
  const { payload } = action;
  const oldSourceUrl = state.sourceUrl;
  const newSourceUrl = payload.url;
  const posts = oldSourceUrl === newSourceUrl
    ? state.posts
    : [];
  return _.assign({}, state, { posts, sourceUrl: payload.url });
}

export function reduceReceivePosts(state, action) {
  const { payload } = action;
  const posts = [].concat(state.posts, payload.posts);
  return _.assign({}, state, { posts });
}

export function reduceSetSortType(state, action) {
  const { payload } = action;
  const oldSortType = state.sortType;
  const newSortType = payload.sortType;
  const posts = oldSortType === newSortType
    ? state.posts
    : [];
  return _.assign({}, state, { posts, sortType: newSortType });
}

export function reduceSetSortRange(state, action) {
  const { payload } = action;
  const oldSortRange = state.sortRange;
  const newSortRange = payload.sortRange;
  const posts = oldSortRange === newSortRange
    ? state.posts
    : [];
  return _.assign({}, state, { posts, sortRange: newSortRange });
}

const reducerByAction = {
  [REDDIT_ACTIONS.SET_SOURCE_URL]: reduceSetSourceUrl,
  [REDDIT_ACTIONS.RECEIVE_POSTS]: reduceReceivePosts,
  [REDDIT_ACTIONS.SET_SORT_TYPE]: reduceSetSortType,
  [REDDIT_ACTIONS.SET_SORT_RANGE]: reduceSetSortRange
};

export function redditDomain() {
  return 'reddit';
}

export function redditReducer(state = initialState(), action) {
  const reducer = reducerByAction[action.type] || _.identity;
  return reducer(state, action);
}
