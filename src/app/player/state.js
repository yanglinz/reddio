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

function reduceSetState(state, action) {
  return state;
}

function reduceSetQueue(state, action) {
  return state;
}

function reduceSetCurrentSong(state, action) {
  return state;
}

function reduceSetNextSong(state, action) {
  return state;
}

function reduceSetPreviousSong(state, action) {
  return state;
}

function reduceShuffle(state, action) {
  return state;
}

function reduceUnshuffle(state, action) {
  return state;
}

const reducerByAction = {
  [PLAYER_STATE_TRANSITIONS.SET_STATE]: reduceSetState,
  [PLAYER_STATE_TRANSITIONS.SET_QUEUE]: reduceSetQueue,
  [PLAYER_STATE_TRANSITIONS.SET_CURRENT_SONG]: reduceSetCurrentSong,
  [PLAYER_STATE_TRANSITIONS.SET_NEXT_SONG]: reduceSetNextSong,
  [PLAYER_STATE_TRANSITIONS.SET_PREVIOUS_SONG]: reduceSetPreviousSong,
  [PLAYER_STATE_TRANSITIONS.SHUFFLE]: reduceShuffle,
  [PLAYER_STATE_TRANSITIONS.UNSHUFFLE]: reduceUnshuffle
};

export function playerReducer(state = initialState(), action) {
  const reducer = reducerByAction[action.type] || _.identity;
  return reducer(state);
}
