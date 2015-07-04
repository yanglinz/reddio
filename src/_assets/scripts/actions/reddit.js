import { RedditActionTypes } from './action.constants.js';
import { RedditApi } from '../lib/reddit.js';

const RedditActions = {
  setActiveSubreddit(subreddit) {
    return {
      type: RedditActionTypes.SET_ACTIVE_SUBREDDIT,
      payload: {
        subreddit: subreddit
      }
    };
  },

  setActiveSortType(sortType) {
    return {
      type: RedditActionTypes.SET_ACTIVE_SORT_TYPE,
      payload: {
        sortType: sortType
      }
    };
  },

  fetchPosts(subreddit, sortType, count) {
    let fetchPromise = RedditApi.get({
      subreddit: subreddit,
      sortType: sortType,
      count: count
    });
    return {
      type: RedditActionTypes.FETCH_POSTS,
      payload: fetchPromise
    };
  }
};

export default RedditActions;
