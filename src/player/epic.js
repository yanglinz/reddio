import _ from 'lodash';
import Rx from 'rxjs/Rx';
import { combineEpics } from 'redux-observable';

import { REDDIT_ACTIONS } from 'reddit/constants';
import { PLAYER_TARGETS, PLAYER_ACTIONS } from 'player/constants';
import { selectIsYoutubeActive, selectIsSoundcloudActive } from 'player/reducer';
import { load, getEvents$, play, pause } from 'player/controls';

export function loadIframeEpic() {
  const init$ = Rx.Observable
    .of({ type: PLAYER_ACTIONS.LOAD_IFRAME });
  const load$ = Rx.Observable.fromPromise(load())
    .map(() => ({ type: PLAYER_ACTIONS.LOAD_IFRAME_DONE }))
    .catch(() => ({ type: PLAYER_ACTIONS.LOAD_IFRAME_FAIL }));
  return init$.concat(load$);
}

export function eventsEpic(action$) {
  return action$
    .ofType(PLAYER_ACTIONS.LOAD_IFRAME_DONE)
    .mergeMap(() => (
      Rx.Observable
        .fromPromise(getEvents$())
        .mergeMap(events => events)
        .map(event => ({ type: PLAYER_ACTIONS.ON_EVENT, payload: event }))
    ));
}

export function hideIframesEpic(action$, store) {
  const activeClassName = 'active';
  const inactiveClassName = 'inactive';

  const stateChange$ = action$
    .ofType(PLAYER_ACTIONS.ON_EVENT)
    .map(() => store.getState());

  const youtubeActive$ = stateChange$
    .filter(selectIsYoutubeActive)
    .map(() => document.getElementById(PLAYER_TARGETS.YOUTUBE))
    .map((el) => el.className = activeClassName);

  const youtubeInactive$ = stateChange$
    .filter((state) => !selectIsYoutubeActive(state))
    .map(() => document.getElementById(PLAYER_TARGETS.YOUTUBE))
    .map((el) => el.className = inactiveClassName);

  const soundcloudActive$ = stateChange$
    .filter(selectIsSoundcloudActive)
    .map(() => document.getElementById(PLAYER_TARGETS.SOUNDCLOUD))
    .map((el) => el.className = activeClassName);

  const soundcloudInactive$ = stateChange$
    .filter((state) => !selectIsSoundcloudActive(state))
    .map(() => document.getElementById(PLAYER_TARGETS.SOUNDCLOUD))
    .map((el) => el.className = inactiveClassName);

  return Rx.Observable.merge(
    youtubeActive$,
    youtubeInactive$,
    soundcloudActive$,
    soundcloudInactive$,
  ).mapTo({ type: PLAYER_ACTIONS.NOOP });
}

export function playEpic(actions$) {
  return actions$
    .ofType(REDDIT_ACTIONS.PLAY_COMMAND)
    .map((action) => {
      const { payload } = action;
      const { url } = payload.post.data;
      play(url);
      return { type: PLAYER_ACTIONS.PLAYING, payload };
    });
}

export function pauseEpic(actions$) {
  return actions$
    .ofType(PLAYER_ACTIONS.PAUSE_COMMAND)
    .map(() => {
      pause();
      return { type: PLAYER_ACTIONS.PAUSING };
    });
}

const redditEpic = combineEpics(
  loadIframeEpic,
  eventsEpic,
  hideIframesEpic,
  playEpic,
  pauseEpic,
);

export default redditEpic;
