import Rx from 'rxjs/Rx';
import { combineEpics } from 'redux-observable';

import { REDDIT_ACTIONS } from 'reddit/constants';
import * as api from 'reddit/api';

const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export function requestPostsEpic(actions$) {
  return actions$
    .ofType(ROUTER_LOCATION_CHANGE)
    .filter(action => action.payload.pathname !== '/')
    .map(action => ({
      type: REDDIT_ACTIONS.REQUEST_POSTS,
      payload: action.payload
    }));
}

export function fetchPostsEpic(actions$) {
  return actions$
    .ofType(REDDIT_ACTIONS.REQUEST_POSTS)
    .mergeMap((action) => {
      const { pathname, query } = action.payload;
      return Rx.Observable.fromPromise(api.getListing(pathname, query))
        .map((response) => {
          const payload = { pathname, query, response };
          return { type: REDDIT_ACTIONS.RECEIVE_POSTS, payload };
        })
        .catch((err) => {
          const payload = { error: err };
          return { type: REDDIT_ACTIONS.FETCH_POSTS_ERROR, payload };
        });
    });
}

const redditEpic = combineEpics(
  requestPostsEpic,
  fetchPostsEpic,
);

export default redditEpic;
