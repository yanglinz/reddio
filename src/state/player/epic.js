import Rx from 'rxjs/Rx';
import { combineEpics } from 'redux-observable';

import { PLAYER_TARGETS, EVENTS } from 'state/constants';
import { selectIsYoutubeActive, selectIsSoundcloudActive } from 'state/player/reducer';
import { load, getEvents$, play, pause } from 'services/iframe-api';

export function loadIframeEpic() {
  const init$ = Rx.Observable
    .of({ type: EVENTS.LOAD_IFRAME });
  const load$ = Rx.Observable.fromPromise(load())
    .map(() => ({ type: EVENTS.LOAD_IFRAME_DONE }))
    .catch(() => ({ type: EVENTS.LOAD_IFRAME_FAIL }));
  return init$.concat(load$);
}

export function eventsEpic(action$) {
  return action$
    .ofType(EVENTS.LOAD_IFRAME_DONE)
    .mergeMap(() => (
      Rx.Observable
        .fromPromise(getEvents$())
        .mergeMap(events => events)
        .map(event => ({ type: EVENTS.ON_EVENT, payload: event }))
    ));
}

export function hideIframesEpic(action$, store) {
  const activeClassName = 'active';
  const inactiveClassName = 'inactive';

  const activate = (el) => {
    el.classList.add(activeClassName);
    el.classList.remove(inactiveClassName);
  };

  const deactivate = (el) => {
    el.classList.add(inactiveClassName);
    el.classList.remove(activeClassName);
  };

  const stateChange$ = action$
    .ofType(EVENTS.ON_EVENT)
    .map(() => store.getState());

  const youtubeActive$ = stateChange$
    .filter(selectIsYoutubeActive)
    .map(() => document.getElementById(PLAYER_TARGETS.YOUTUBE))
    .map(activate);

  const youtubeInactive$ = stateChange$
    .filter(state => !selectIsYoutubeActive(state))
    .map(() => document.getElementById(PLAYER_TARGETS.YOUTUBE))
    .map(deactivate);

  const soundcloudActive$ = stateChange$
    .filter(selectIsSoundcloudActive)
    .map(() => document.getElementById(PLAYER_TARGETS.SOUNDCLOUD))
    .map(activate);

  const soundcloudInactive$ = stateChange$
    .filter(state => !selectIsSoundcloudActive(state))
    .map(() => document.getElementById(PLAYER_TARGETS.SOUNDCLOUD))
    .map(deactivate);

  return Rx.Observable.merge(
    youtubeActive$,
    youtubeInactive$,
    soundcloudActive$,
    soundcloudInactive$,
  ).mapTo({ type: EVENTS.NOOP });
}

export function playEpic(actions$) {
  return actions$
    .ofType(EVENTS.PLAY_COMMAND)
    .map((action) => {
      const { payload } = action;
      const { url } = payload.post.data;
      play(url);
      return { type: EVENTS.PLAYING, payload };
    });
}

export function pauseEpic(actions$) {
  return actions$
    .ofType(EVENTS.PAUSE_COMMAND)
    .map(() => {
      pause();
      return { type: EVENTS.PAUSING };
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
