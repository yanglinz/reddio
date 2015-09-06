import { fetchPosts as redditFetchPosts } from 'reddit/api.js';
import { logError } from 'core/logger.js';

export const SET_POSTS = 'SET_POSTS';
export function setPosts(posts, subreddit, sortType, sortRange) {
  return {
    type: SET_POSTS,
    posts: posts,
    subreddit: subreddit,
    sortType: sortType,
    sortRange: sortRange
  };
}

export const SET_FETCH_BEGIN = 'SET_FETCH_BEGIN';
export function setFetchBegin() {
  return {
    type: SET_FETCH_BEGIN
  }
}

export const SET_FETCH_END = 'SET_FETCH_END';
export function setFetchEnd() {
  return {
    type: SET_FETCH_END
  }
}

export const FETCH_POSTS = 'FETCH_POSTS';
export function fetchPosts(subreddit, sortType, sortRange, params={}) {
  return (dispatch, getState) => {
    dispatch(setFetchBegin());

    const payload = {
      sortType: sortType,
      sortRange: sortRange
    };
    redditFetchPosts(subreddit, payload)
      .then((posts) => {
        dispatch(setFetchEnd());
        dispatch(setPosts(posts, subreddit, sortType, sortRange));
      })
      .catch((err) => {
        logError(err);
      });
  };
}
