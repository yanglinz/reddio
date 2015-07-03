import { PlayerActionTypes } from '../../actions/action.constants.js';

export const initialPlayerState = {
  isPlayer: true
};

export default function GetPlayerReducer(action) {
  let reducer;

  switch(action.type) {
    case PlayerActionTypes.PLAY_SONG:
      reducer = function reducePlaySong(playerState) {
        playerState.isPlaying = true;
        return playerState;
      };
      break;

    case PlayerActionTypes.PAUSE_SONG:
      reducer = function reducePlaySong(playerState) {
        playerState.isPlaying = false;
        return playerState;
      };
      break;

    case PlayerActionTypes.PREV_SONG:
      reducer = function reducePrevSong(playerState) {
        let currentSong = action.currentSong;
        playerState.queue = [currentSong];
        playerState.currentSong = {};
        return playerState;
      };
      break;

    case PlayerActionTypes.NEXT_SONG:
      reducer = function reduceNextSong(playerState) {
        let currentSong = action.currentSong;
        playerState.queue = [currentSong];
        playerState.currentSong = {};
        return playerState;
      };
      break;
  }

  return reducer;
}
