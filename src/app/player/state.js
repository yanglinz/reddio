import _ from 'lodash';

import { PLAYER_ACTIONS, PLAYER_STATES } from 'player/constants.js';

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
  [PLAYER_ACTIONS.SET_STATE]: _.identity,
  [PLAYER_ACTIONS.SET_QUEUE]: _.identity,
  [PLAYER_ACTIONS.PLAY_SONG]: _.identity,
  [PLAYER_ACTIONS.PAUSE_SONG]: _.identity,
  [PLAYER_ACTIONS.RESET_SONG]: _.identity,
  [PLAYER_ACTIONS.NEXT_SONG]: _.identity,
  [PLAYER_ACTIONS.PREVIOUS_SONG]: _.identity,
  [PLAYER_ACTIONS.SHUFFLE]: _.identity,
  [PLAYER_ACTIONS.UNSHUFFLE]: _.identity
};

export function playerReducer(state = initialState(), action) {
  const reducer = reducerByAction[action.type] || _.identity;
  return reducer(state);
}
