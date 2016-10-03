import _ from 'lodash';

import { PLAYER_ACTIONS, PLAYER_STATES } from 'player/constants';

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
  const { payload } = action;
  return _.assign({}, state, { state: payload.state });
}

function reduceSetQueue(state, action) {
  const { payload } = action;
  _.noop(payload);
  return state;
}

function reduceSetCurrentSong(state, action) {
  const { payload } = action;
  _.noop(payload);
  return state;
}

function reduceSetNextSong(state) {
  return state;
}

function reduceSetPreviousSong(state) {
  return state;
}

function reduceShuffle(state) {
  return state;
}

function reduceUnshuffle(state) {
  return state;
}

const reducerByAction = {
  [PLAYER_ACTIONS.SET_STATE]: reduceSetState,
  [PLAYER_ACTIONS.SET_QUEUE]: reduceSetQueue,
  [PLAYER_ACTIONS.SET_CURRENT_SONG]: reduceSetCurrentSong,
  [PLAYER_ACTIONS.SET_NEXT_SONG]: reduceSetNextSong,
  [PLAYER_ACTIONS.SET_PREVIOUS_SONG]: reduceSetPreviousSong,
  [PLAYER_ACTIONS.SHUFFLE]: reduceShuffle,
  [PLAYER_ACTIONS.UNSHUFFLE]: reduceUnshuffle
};

export function playerReducer(state = initialState(), action) {
  const reducer = reducerByAction[action.type] || _.identity;
  return reducer(state, action);
}