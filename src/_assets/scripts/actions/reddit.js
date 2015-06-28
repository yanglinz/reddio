import RSVP from 'rsvp';
import { RedditActionTypes } from './action.constants.js';

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
    }
  },

  fetchPosts(count) {
    let fetchPromise = new RSVP.Promise(function resolveFetch(resolve, reject) {
      setTimeout(function () {
        resolve([{}, {}]);
      }, 1500);
    });

    return {
      type: RedditActionTypes.FETCH_POSTS,
      payload: fetchPromise
    }
  }
};

export default RedditActions;
