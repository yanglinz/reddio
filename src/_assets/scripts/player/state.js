import { PlayerActionTypes } from '../core/constants.js';

function getInitialPlayerState() {
  return {
    currentSong: null,
    playerIsPlaying: true
  };
}

function getPlayerMutator(action) {
  let mutators = {
    [PlayerActionTypes.PLAY_SONG]: function statePlaySong(playerState) {
      playerState.isPlaying = true;
      return playerState;
    },

    [PlayerActionTypes.PAUSE_SONG]: function statePauseSong(playerState) {
      playerState.isPlaying = false;
      return playerState;
    },

    [PlayerActionTypes.PREV_SONG]: function statePrevSong(playerState) {
      let currentSong = playerState.currentSong;
      playerState.queue = [currentSong];
      playerState.currentSong = {};
      return playerState;
    },

    [PlayerActionTypes.NEXT_SONG]: function stateNextSong(playerState) {
      let currentSong = playerState.currentSong;
      playerState.queue = [currentSong];
      playerState.currentSong = {};
      return playerState;
    },

    defaults: function noop(playerState) {
      return playerState;
    }
  };

  return mutators[action.type] || mutators.defaults;
}

export default getPlayerMutator;
export { getInitialPlayerState };
