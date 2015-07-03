import { RedditActionTypes} from '../../actions/action.constants.js';

export const initialRedditState = {
  activeSubreddit: 'listentothis',
  activeSortType: 'hot',
  subreddits: [
    'blues',
    'listentothis'
  ],
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

export default function GetRedditReducer(action) {
  let reducer;

  switch(action.type) {
    case RedditActionTypes.SET_ACTIVE_SUBREDDIT:
      reducer = function reduceSetActiveSubreddit(redditState) {
        redditState.activeSubreddit = action.payload.subreddit;
        return redditState;
      };
      break;

    case RedditActionTypes.SET_ACTIVE_SORT_TYPE:
      reducer = function reduceSetActiveSortType(redditState) {
        redditState.activeSortType = action.payload.sortType;
        return redditState;
      };
      break;

    case RedditActionTypes.FETCH_POSTS:
      reducer = function reduceFetchPosts(redditState) {
        const activeSubreddit = redditState.activeSubreddit;
        redditState[activeSubreddit] = []
          .concat(redditState[activeSubreddit])
          .concat(action.payload.posts);
        return redditState;
      };
      break;
  }

  return reducer;
}
