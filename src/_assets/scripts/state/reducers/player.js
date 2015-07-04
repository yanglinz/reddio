import { PlayerActionTypes } from '../../actions/action.constants.js';

const initialPlayerState = {
  currentSong: null,
  playerIsPlaying: true
};

function getPlayerReducer(action) {
  let reducers = {
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

  return reducers[action.type] || reducers.defaults;
}

export default getPlayerReducer;
export { initialPlayerState };
