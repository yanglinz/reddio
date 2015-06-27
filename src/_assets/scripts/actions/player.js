import { PlayerActionTypes } from './action.constants.js';

const PlayerActions = {
  playSong(song) {
    return {
      type: PlayerActionTypes.PLAY_SONG,
      song: song
    };
  },

  pauseSong() {
    return {
      type: PlayerActionTypes.PAUSE_SONG
    }
  },

  nextSong(currentSong) {
    return {
      type: PlayerActionTypes.NEXT_SONG,
      currentSong: currentSong
    }
  },

  prevSong(currentSong) {
    return {
      type: PlayerActionTypes.PREV_SONG,
      currentSong: currentSong
    }
  }
};

export default PlayerActions;
