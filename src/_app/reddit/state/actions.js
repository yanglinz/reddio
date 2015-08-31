/**
 * Define action constants
 */

export const SET_POSTS = 'SET_POSTS';

/**
 * Define action creators
 */

export function setPosts(posts, subreddit, sortType, sortRange) {
  return {
    type: SET_POSTS,
    posts: posts,
    subreddit: subreddit,
    sortType: sortType,
    sortRange: sortRange
  };
}
