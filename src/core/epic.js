import { combineEpics } from 'redux-observable';

import redditEpic from 'reddit/epic';
import playerEpic from 'player/epic';

const rootEpic = combineEpics(
  redditEpic,
  playerEpic,
);

export default rootEpic;
