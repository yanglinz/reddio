import _ from 'lodash';

import { REDDIT_ACTIONS } from 'reddit/constants';
import { routePathParams } from 'core/routes';

export function initialState() {
  return {
    subreddit: null,
    sortType: null,
    sortRange: null,
    posts: []
  };
}

export function reduceRouteChange(state, action) {
  const { payload } = action;
  const pathParams = routePathParams(payload.pathname);
  if (pathParams) {
    const { subreddit = null, sortType = null, sortRange = null } = pathParams;
    const isSameParams = (
    subreddit === state.subreddit &&
    sortType === state.sortType &&
    sortRange === state.sortRange);
    const posts = isSameParams ? state.posts : [];
    return _.assign({}, state, {
      subreddit,
      sortType,
      sortRange,
      posts
    });
  }
  return state;
}

export function reduceReceivePosts(state, action) {
  const { payload } = action;
  const { response } = payload;
  const posts = response.data.children || [];
  const newPosts = [].concat(state.posts, posts);
  return _.assign({}, state, { posts: newPosts });
}

const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

const reducerByAction = {
  [REDDIT_ACTIONS.RECEIVE_POSTS]: reduceReceivePosts,
  [ROUTER_LOCATION_CHANGE]: reduceRouteChange
};

export function redditDomain() {
  return 'reddit';
}

export function redditReducer(state = initialState(), action) {
  const reducer = reducerByAction[action.type] || _.identity;
  return reducer(state, action);
}
