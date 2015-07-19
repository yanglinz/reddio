import { PlayerActionTypes } from './../core/constants.js';

const PlayerActions = {
  playSong(song) {
    return {
      type: PlayerActionTypes.PLAY_SONG,
      payload: {
        song: song
      }
    };
  },

  pauseSong() {
    return {
      type: PlayerActionTypes.PAUSE_SONG,
      payload: {}
    };
  },

  nextSong(currentSong) {
    return {
      type: PlayerActionTypes.NEXT_SONG,
      payload: {
        currentSong: currentSong
      }
    };
  },

  prevSong(currentSong) {
    return {
      type: PlayerActionTypes.PREV_SONG,
      payload: {
        currentSong: currentSong
      }
    };
  }
};

export default PlayerActions;
