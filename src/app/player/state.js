import _ from 'lodash';

import { PLAYER_STATE_TRANSITIONS, PLAYER_STATES } from 'player/constants.js';

/**
 * Get initial player state
 */
export function initialState() {
  return {
    state: PLAYER_STATES.LOADING,
    songs: {},
    currentSong: null,
    queue: [],
    shuffledQueue: [],
    history: []
  };
}

const reducerByAction = {
  [PLAYER_STATE_TRANSITIONS.SET_STATE]: _.identity,
  [PLAYER_STATE_TRANSITIONS.SET_QUEUE]: _.identity,
  [PLAYER_STATE_TRANSITIONS.SET_CURRENT_SONG]: _.identity,
  [PLAYER_STATE_TRANSITIONS.SET_NEXT_SONG]: _.identity,
  [PLAYER_STATE_TRANSITIONS.SET_PREVIOUS_SONG]: _.identity,
  [PLAYER_STATE_TRANSITIONS.SHUFFLE]: _.identity,
  [PLAYER_STATE_TRANSITIONS.UNSHUFFLE]: _.identity
};

export function playerReducer(state = initialState(), action) {
  const reducer = reducerByAction[action.type] || _.identity;
  return reducer(state);
}
