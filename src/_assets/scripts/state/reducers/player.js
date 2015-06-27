import { PlayerActionTypes } from '../../actions/action.constants.js';

const PlayerReducer = {
  [PlayerActionTypes.PLAY_SONG]: function reducePlaySong(playerState) {
    playerState.isPlaying = true;
    return playerState;
  },

  [PlayerActionTypes.PAUSE_SONG]: function reducePauseSong(playerState) {
    playerState.isPlaying = false;
    return playerState;
  },

  [PlayerActionTypes.PREV_SONG]: function reducePrevSong(playerState) {
    playerState.queue = [];
    playerState.currentSong = {};
    return playerState;
  },

  [PlayerActionTypes.NEXT_SONG]: function reduceNextSong(playerState) {
    playerState.queue = [];
    playerState.currentSong = {};
    return playerState;
  }
};

export default PlayerReducer;
