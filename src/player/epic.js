import Rx from 'rxjs/Rx';
import { combineEpics } from 'redux-observable';

import { REDDIT_ACTIONS } from 'reddit/constants';
import { PLAYER_ACTIONS } from 'player/constants';
import { load, listen, play, pause } from 'player/controls';

export function loadIframeEpic() {
  const init$ = Rx.Observable
    .of({ type: PLAYER_ACTIONS.LOAD_IFRAME });
  const load$ = Rx.Observable.fromPromise(load())
    .map(() => ({ type: PLAYER_ACTIONS.LOAD_IFRAME_DONE }))
    .catch(() => ({ type: PLAYER_ACTIONS.LOAD_IFRAME_FAIL }));
  return init$.concat(load$);
}

export function playEpic(actions$) {
  return actions$
    .ofType(REDDIT_ACTIONS.PLAY_POST)
    .map((action) => {
      const { payload } = action;
      const { url } = payload.post.data;
      play(url);
      return { type: PLAYER_ACTIONS.PLAYING, payload };
    });
}

export function pauseEpic(actions$) {
  return actions$
    .ofType(PLAYER_ACTIONS.PAUSE_PLAYER)
    .map((action) => {
      pause();
      return { type: PLAYER_ACTIONS.PAUSING };
    });
}

const redditEpic = combineEpics(
  loadIframeEpic,
  playEpic,
  pauseEpic,
);

export default redditEpic;
