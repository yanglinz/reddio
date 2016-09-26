import _ from 'lodash';

import { REDDIT_ACTIONS } from 'reddit/constants';

export function initialState() {
  return {
    pathname: null,
    query: null,
    sortType: null,
    sortRange: null,
    posts: []
  };
}

export function reduceRouteChange(state, action) {
  const { payload } = action;
  const { pathname, query } = payload;
  return _.assign({}, state, { pathname, query });
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
  [ROUTER_LOCATION_CHANGE]: reduceRouteChange,
  [REDDIT_ACTIONS.RECEIVE_POSTS]: reduceReceivePosts
};

export function redditDomain() {
  return 'reddit';
}

export function redditReducer(state = initialState(), action) {
  const reducer = reducerByAction[action.type] || _.identity;
  return reducer(state, action);
}
