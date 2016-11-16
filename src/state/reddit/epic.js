import Rx from 'rxjs/Rx';
import { combineEpics } from 'redux-observable';

import { EVENTS } from 'state/constants';
import * as actions from 'state/reddit/actions';
import * as api from 'services/reddit-api';

export function requestPostsEpic(actions$) {
  return actions$
    .ofType(EVENTS.ROUTER_LOCATION_CHANGE)
    .filter(action => action.payload.pathname !== '/')
    .map((action) => {
      const { pathname, query } = action.payload;
      return actions.requestPosts(pathname, query);
    });
}

export function fetchPostsEpic(actions$) {
  return actions$
    .ofType(EVENTS.REQUEST_POSTS)
    .mergeMap((action) => {
      const { pathname, query } = action.payload;
      return Rx.Observable
        .fromPromise(api.getListing(pathname, query))
        .map(response => actions.receivePosts(pathname, query, response))
        .catch(error => actions.fetchPostsError(error));
    });
}

const redditEpic = combineEpics(
  requestPostsEpic,
  fetchPostsEpic,
);

export default redditEpic;
