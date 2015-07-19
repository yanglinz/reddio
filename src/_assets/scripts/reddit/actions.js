import { ActionTypes } from './../core/constants.js';
import { RedditApi } from './api.js';
import { progressBar } from '../core/utils.js';

const RedditActions = {
  setActiveSubreddit(subreddit) {
    return {
      type: ActionTypes.SET_ACTIVE_SUBREDDIT,
      payload: {
        subreddit: subreddit
      }
    };
  },

  setActiveListingType(listingType) {
    return {
      type: ActionTypes.SET_ACTIVE_LISTING_TYPE,
      payload: {
        listingType: listingType
      }
    };
  },

  setActiveSortRange(sortRange) {
    return {
      type: ActionTypes.SET_ACTIVE_SORT_RANGE,
      payload: {
        sortRange: sortRange
      }
    };
  },

  setQueue(song) {
    return {
      type: ActionTypes.SET_QUEUE,
      payload: {
        song: song
      }
    };
  },

  fetchPosts(subreddit, listingType, sortRange, after, limit) {
    let fetchPromise = RedditApi.get({
      subreddit: subreddit,
      listingType: listingType,
      sortRange: sortRange,
      limit: limit,
      after: after
    });

    progressBar.fromPromise(fetchPromise);

    return {
      type: ActionTypes.FETCH_POSTS,
      payload: fetchPromise
    };
  }
};

export default RedditActions;
