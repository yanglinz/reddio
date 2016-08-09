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
  const { subreddit = null, sortType = null, sortRange = null } = pathParams || {};
  return _.assign({}, state, {
    subreddit,
    sortType,
    sortRange
  });
}

export function reduceReceivePosts(state, action) {
  const { payload } = action;
  const posts = [].concat(state.posts, payload.posts);
  return _.assign({}, state, { posts });
}

const reducerByAction = {
  [REDDIT_ACTIONS.RECEIVE_POSTS]: reduceReceivePosts,
  [REDDIT_ACTIONS.ROUTER_LOCATION_CHANGE]: reduceRouteChange
};

export function redditDomain() {
  return 'reddit';
}

export function redditReducer(state = initialState(), action) {
  const reducer = reducerByAction[action.type] || _.identity;
  return reducer(state, action);
}
