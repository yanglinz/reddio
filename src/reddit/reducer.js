import _ from 'lodash';

import { REDDIT_ACTIONS, REDDIT_SORT_TYPES } from 'reddit/constants';

export function initialState() {
  return {
    pathname: null,
    query: null,
    sortType: null,
    sortRange: null,
    posts: [],
  };
}

export function selectPosts(state) {
  return state.reddit.posts;
}

const _sortTypes = _.keys(REDDIT_SORT_TYPES);

export function selectBaseLink(state) {
  const pathname = state.reddit.pathname || '';
  const fragments = _.trimEnd(pathname, '/').split('/');
  const isNonBaseLink = _.includes(_sortTypes, _.last(fragments));
  const baseLink = isNonBaseLink
    ? _.initial(fragments).join('/')
    : fragments.join('/');
  return _.isEmpty(baseLink)
    ? null
    : _.trimEnd(baseLink, '/');
}

export function selectHotLink(state) {
  const baseLink = selectBaseLink(state);
  return _.isEmpty(baseLink)
    ? null
    : baseLink.concat('/').concat(REDDIT_SORT_TYPES.hot);
}

export function selectNewLink(state) {
  const baseLink = selectBaseLink(state);
  return _.isEmpty(baseLink)
    ? null
    : baseLink.concat('/').concat(REDDIT_SORT_TYPES.new);
}

export function selectRisingLink(state) {
  const baseLink = selectBaseLink(state);
  return _.isEmpty(baseLink)
    ? null
    : baseLink.concat('/').concat(REDDIT_SORT_TYPES.rising);
}

export function selectControversialLink(state) {
  const baseLink = selectBaseLink(state);
  return _.isEmpty(baseLink)
    ? null
    : baseLink.concat('/').concat(REDDIT_SORT_TYPES.controversial);
}

export function reduceRouteChange(state, action) {
  const { payload } = action;
  const { pathname, query } = payload;
  const hasNewPathname = pathname !== state.pathname;
  const hasNewQuery = (query && query.t) !== (state.query && state.query.t);
  const invalidatePosts = hasNewPathname || hasNewQuery;
  const posts = invalidatePosts
    ? []
    : state.posts;
  return _.assign({}, state, { pathname, query, posts });
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
  [REDDIT_ACTIONS.RECEIVE_POSTS]: reduceReceivePosts,
};

export function redditReducer(state = initialState(), action) {
  const reducer = reducerByAction[action.type] || _.identity;
  return reducer(state, action);
}
