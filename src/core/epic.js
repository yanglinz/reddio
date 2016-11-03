import Rx from 'rxjs/Rx';
import { combineEpics } from 'redux-observable';

import redditEpic from 'reddit/epic';
import playerEpic from 'player/epic';

function initializeEpic() {
  return Rx.Observable
    .of({ type: 'EPIC_INITIALIZED' });
}

const rootEpic = combineEpics(
  initializeEpic,
  redditEpic,
  playerEpic,
);

export default rootEpic;
