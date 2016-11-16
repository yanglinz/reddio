import Rx from 'rxjs/Rx';
import { combineEpics } from 'redux-observable';

import { PLAYER_TARGETS, EVENTS } from 'state/constants';
import * as actions from 'state/player/actions';
import { selectIsYoutubeActive, selectIsSoundcloudActive } from 'state/player/reducer';
import { load, getEvents$, play, pause } from 'services/iframe-api';

export function loadIframeEpic() {
  const init$ = Rx.Observable.of(actions.loadIframe());
  const load$ = Rx.Observable.fromPromise(load())
    .map(() => actions.loadIframeDone())
    .catch(() => actions.loadIframeFail());
  return init$.concat(load$);
}

export function eventsEpic(action$) {
  return action$
    .ofType(EVENTS.LOAD_IFRAME_DONE)
    .mergeMap(() => (
      Rx.Observable
        .fromPromise(getEvents$())
        .mergeMap(events => events)
        .map(event => actions.onEvent(event))
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
  ).mapTo(actions.noop());
}

export function playEpic(actions$) {
  return actions$
    .ofType(EVENTS.PLAY_COMMAND)
    .map((action) => {
      const { post } = action.payload.action;
      play(post.data.url);
      return actions.playing(post);
    });
}

export function pauseEpic(actions$) {
  return actions$
    .ofType(EVENTS.PAUSE_COMMAND)
    .map(() => {
      pause();
      return actions.pausing();
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
