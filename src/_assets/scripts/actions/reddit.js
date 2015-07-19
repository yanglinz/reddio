import { RedditActionTypes } from './../core/constants.js';
import { RedditApi } from '../reddit/api.wrapper.js';
import { progressBar } from '../core/utils.js';

const RedditActions = {
  setActiveSubreddit(subreddit) {
    return {
      type: RedditActionTypes.SET_ACTIVE_SUBREDDIT,
      payload: {
        subreddit: subreddit
      }
    };
  },

  setActiveListingType(listingType) {
    return {
      type: RedditActionTypes.SET_ACTIVE_LISTING_TYPE,
      payload: {
        listingType: listingType
      }
    };
  },

  setActiveSortRange(sortRange) {
    return {
      type: RedditActionTypes.SET_ACTIVE_SORT_RANGE,
      payload: {
        sortRange: sortRange
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
      type: RedditActionTypes.FETCH_POSTS,
      payload: fetchPromise
    };
  }
};

export default RedditActions;
