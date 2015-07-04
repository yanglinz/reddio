import { RedditActionTypes} from '../../actions/action.constants.js';

const initialRedditState = {
  activeSubreddit: 'listentothis',
  activeSortType: 'hot',
  subreddits: {
    blues: [],
    listentothis: []
  },
  sortTypes: [
    'new',
    'hot',
    'random',
    'top:hour',
    'top:day',
    'top:week',
    'top:month',
    'top:year',
    'top:all'
  ]
};

function getRedditMutator(action) {
  let mutators = {
    [RedditActionTypes.SET_ACTIVE_SUBREDDIT]: function stateSetActiveSubreddit(state) {
      state.activeSubreddit = action.payload.subreddit;
      return state;
    },

    [RedditActionTypes.SET_ACTIVE_SORT_TYPE]: function stateSetActiveSortType(state) {
      state.activeSortType = action.payload.sortType;
      return state;
    },

    [RedditActionTypes.FETCH_POSTS]: function reduceFetchPosts(state) {
      const activeSubreddit = state.activeSubreddit;
      state.subreddits[activeSubreddit] = []
        .concat(state.subreddits[activeSubreddit] || [])
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
export { initialRedditState };
