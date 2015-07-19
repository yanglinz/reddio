import { ActionTypes } from '../core/constants.js';

const initialState = {
  isPlaying: true,
  queue: [],
  queueHistory: []
};

const mutators = {
  [ActionTypes.PLAY_SONG]: function statePlaySong(action, state) {
    state.isPlaying = true;
    return state;
  },

  [ActionTypes.PAUSE_SONG]: function statePauseSong(action, state) {
    state.isPlaying = false;
    return state;
  },

  [ActionTypes.PREV_SONG]: function statePrevSong(action, state) {
    return state;
  },

  [ActionTypes.NEXT_SONG]: function stateNextSong(action, state) {
    return state;
  }
};

export { initialState, mutators };
