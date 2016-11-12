import Rx from 'rxjs/Rx';
import { combineEpics } from 'redux-observable';

import { EVENTS } from 'state/constants';
import * as api from 'reddit/api';

const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export function requestPostsEpic(actions$) {
  return actions$
    .ofType(ROUTER_LOCATION_CHANGE)
    .filter(action => action.payload.pathname !== '/')
    .map(action => ({
      type: EVENTS.REQUEST_POSTS,
      payload: action.payload,
    }));
}

export function fetchPostsEpic(actions$) {
  return actions$
    .ofType(EVENTS.REQUEST_POSTS)
    .mergeMap((action) => {
      const { pathname, query } = action.payload;
      return Rx.Observable
        .fromPromise(api.getListing(pathname, query))
        .map((response) => {
          const payload = { pathname, query, response };
          return { type: EVENTS.RECEIVE_POSTS, payload };
        })
        .catch((err) => {
          const payload = { error: err };
          return { type: EVENTS.FETCH_POSTS_ERROR, payload };
        });
    });
}

const redditEpic = combineEpics(
  requestPostsEpic,
  fetchPostsEpic,
);

export default redditEpic;
