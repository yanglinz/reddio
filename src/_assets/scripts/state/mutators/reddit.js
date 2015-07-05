import _ from 'lodash';
import { RedditActionTypes} from '../../actions/action.constants.js';

function getInitialRedditState() {
  const _listingTypes = [
    {type: 'new'},
    {type: 'hot'},
    {type: 'top', range: 'hour'},
    {type: 'top', range: 'day'},
    {type: 'top', range: 'week'},
    {type: 'top', range: 'month'},
    {type: 'top', range: 'year'},
    {type: 'top', range: 'all'}
  ];

  const _subreddits = [
    'blues',
    'listentothis'
  ];

  const _storageKeys = _.map(_listingTypes, t => `${t.type}:${t.range || ''}`);
  let _subredditsStorage = _.reduce(_subreddits, function reduceSubredditState(result, subreddit) {
    result[subreddit] = _.object(_storageKeys);
    result[subreddit] = _.mapValues(result[subreddit], () => []);
    return result;
  }, {});

  return {
    activeSubreddit: 'listentothis',
    activeListingType: 'hot',
    activeSortRange: 'day',
    subreddits: _subredditsStorage,
    listingTypes: _.uniq(_.pluck(_listingTypes, 'type')),
    sortRanges: _.compact(_.pluck(_listingTypes, 'range'))
  };
}

function getRedditMutator(action) {
  let mutators = {
    [RedditActionTypes.SET_ACTIVE_SUBREDDIT]: function stateSetActiveSubreddit(state) {
      state.activeSubreddit = action.payload.subreddit;
      return state;
    },

    [RedditActionTypes.SET_ACTIVE_LISTING_TYPE]: function stateSetActiveListingType(state) {
      state.activeListingType = action.payload.listingType;
      return state;
    },

    [RedditActionTypes.SET_ACTIVE_SORT_RANGE]: function stateSetActiveSortRange(state) {
      state.activeSortRange = action.payload.sortRange;
      return state;
    },

    [RedditActionTypes.FETCH_POSTS]: function reduceFetchPosts(state) {
      const activeSubreddit = state.activeSubreddit;
      const activeListingType = state.activeListingType;
      const activeSortRange = state.activeSortRange;
      const storageKey = activeListingType === 'top' ?
        `${activeListingType}:${activeSortRange}` : `${activeListingType}:`;
      state.subreddits[activeSubreddit][storageKey] = []
        .concat(state.subreddits[activeSubreddit][storageKey] || [])
        .concat(action.payload.posts);
      return state;
    },

    defaults: function noop(state) {
      return state;
    }
  };

  return mutators[action.type] || mutators.defaults;
}

export default getRedditMutator;
export { getInitialRedditState };
