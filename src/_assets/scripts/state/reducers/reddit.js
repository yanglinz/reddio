import { RedditActionTypes} from '../../actions/action.constants.js';

export default function GetRedditReducer(action) {
  let reducer;

  switch(action.type) {
    case RedditActionTypes.SET_ACTIVE_SUBREDDIT:
      reducer = function reduceSetActiveSubreddit(redditState) {
        redditState.activeSubreddit = action.subreddit;
        return redditState;
      };
      break;

    case RedditActionTypes.SET_ACTIVE_SORT_TYPE:
      reducer = function reduceSetActiveSortType(redditState) {
        redditState.activeSortType = action.sortType;
        return redditState;
      };
      break;

    case RedditActionTypes.FETCH_POSTS:
      reducer = function reduceFetchPosts(redditState) {
        const activeSubreddit = redditState.activeSubreddit;
        redditState[activeSubreddit] = []
          .concat(redditState[activeSubreddit])
          .concat(action.posts);
        return redditState;
      };
      break;
  }

  return reducer;
}
