import { ActionTypes } from './../core/constants.js';

const PlayerActions = {
  playSong(song) {
    return {
      type: ActionTypes.PLAY_SONG,
      payload: {
        song: song
      }
    };
  },

  pauseSong() {
    return {
      type: ActionTypes.PAUSE_SONG,
      payload: {}
    };
  },

  nextSong(currentSong) {
    return {
      type: ActionTypes.NEXT_SONG,
      payload: {
        currentSong: currentSong
      }
    };
  },

  prevSong(currentSong) {
    return {
      type: ActionTypes.PREV_SONG,
      payload: {
        currentSong: currentSong
      }
    };
  }
};

export default PlayerActions;
