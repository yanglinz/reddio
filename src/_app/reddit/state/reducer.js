import { extend, flatten, map, object, reduce } from 'lodash';
import { SET_POSTS } from 'reddit/state/actions.js';
import { SUBREDDITS, SORT_TYPES, SORT_RANGES } from 'reddit/constants.js';

let topStorageKeys = map(SORT_RANGES, (sortRange) => {
  return `top:${sortRange}`;
});

let storageKeys = map(SORT_TYPES, (sortType) => {
  if (sortType === 'top') {
    return topStorageKeys;
  }
  return sortType;
});
storageKeys = flatten(storageKeys);
storageKeys = object(storageKeys, map(storageKeys, () => {
  return [];
}));

const initialPosts = object(SUBREDDITS, map(SUBREDDITS, () => {
  return storageKeys;
}));

const initialState = {
  posts: initialPosts,
  activePosts: []
};

function redditReducer(state=initialState, action={}) {
  switch (action.type) {
  case SET_POSTS:
    const { posts, subreddit, sortType, sortRange } = action;
    const storageKey = sortType === 'top' ?
      `${sortType}:${sortRange}` : sortType;
    state.posts[subreddit][storageKey] = posts;
    state.activePosts = posts;
    return state;
  default:
    return state;
  }
}

export default redditReducer;
