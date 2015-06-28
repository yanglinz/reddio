import RSVP from 'rsvp';
import { RedditActionTypes } from './action.constants.js';

const RedditActions = {
  setActiveSubreddit(subreddit) {
    return {
      type: RedditActionTypes.SET_ACTIVE_SUBREDDIT,
      subreddit: subreddit
    };
  },

  setActiveSortType(sortType) {
    return {
      type: RedditActionTypes.SET_ACTIVE_SORT_TYPE,
      sortType: sortType
    }
  },

  fetchPosts(count) {
    return new RSVP.Promise(function resolveFetch(resolve, reject) {
      setTimeout(function () {
        let action = {
          type: RedditActionTypes.FETCH_POSTS,
          count: count
        };
        resolve(action);
      }, 5000)
    });
  }
};

export default RedditActions;
