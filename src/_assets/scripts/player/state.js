import { PlayerActionTypes } from '../core/constants.js';

function getInitialPlayerState() {
  return {
    playerIsPlaying: true,
    playerQueue: [],
    playerHistory: []
  };
}

function getPlayerMutator(action) {
  let mutators = {
    [PlayerActionTypes.PLAY_SONG]: function statePlaySong(state) {
      state.isPlaying = true;
      return state;
    },

    [PlayerActionTypes.PAUSE_SONG]: function statePauseSong(state) {
      state.isPlaying = false;
      return state;
    },

    [PlayerActionTypes.PREV_SONG]: function statePrevSong(state) {
      return state;
    },

    [PlayerActionTypes.NEXT_SONG]: function stateNextSong(state) {
      return state;
    },

    defaults: function noop(state) {
      return state;
    }
  };

  return mutators[action.type] || mutators.defaults;
}

export default getPlayerMutator;
export { getInitialPlayerState };
