import _ from 'lodash';

import { PLAYER_TARGETS, PLAYER_STATES, PLAYER_ACTIONS } from 'player/constants';

/**
 * Get initial player state
 */
export function initialState() {
  return {
    currentState: {
      [PLAYER_TARGETS.YOUTUBE]: PLAYER_STATES.LOADING,
      [PLAYER_TARGETS.SOUNDCLOUD]: PLAYER_STATES.LOADING,
    },
    songs: {},
    currentSong: null,
    queue: [],
    shuffledQueue: [],
    history: [],
  };
}

function reduceSetReady(state) {
  const currentState = {
    [PLAYER_TARGETS.YOUTUBE]: PLAYER_STATES.LOADED,
    [PLAYER_TARGETS.SOUNDCLOUD]: PLAYER_STATES.LOADED,
  };
  return _.assign({}, state, { currentState });
}

function reduceSetState(state, action) {
  const { payload } = action;
  return _.assign({}, state, { state: payload.state });
}

const reducerByAction = {
  [PLAYER_ACTIONS.LOAD_IFRAME_DONE]: reduceSetReady,
  [PLAYER_ACTIONS.ON_EVENT]: reduceSetState,
};

export function playerReducer(state = initialState(), action) {
  const reducer = reducerByAction[action.type] || _.identity;
  return reducer(state, action);
}
