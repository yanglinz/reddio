import { ActionTypes } from './../core/constants.js';

const PlayerActions = {
  playSong() {
    return {
      type: ActionTypes.PLAY_SONG,
      payload: {}
    };
  },

  pauseSong() {
    return {
      type: ActionTypes.PAUSE_SONG,
      payload: {}
    };
  },

  nextSong() {
    return {
      type: ActionTypes.NEXT_SONG,
      payload: {}
    };
  },

  prevSong() {
    return {
      type: ActionTypes.PREV_SONG,
      payload: {}
    };
  }
};

export default PlayerActions;
