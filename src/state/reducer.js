import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';

import { playerReducer } from './player/reducer';
import { redditReducer } from './reddit/reducer';

export function rootReducer() {
  return combineReducers({
    routing: routerReducer,
    player: playerReducer,
    reddit: redditReducer,
  });
}
