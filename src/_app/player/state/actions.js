export const SET_ACTIVE_SONG = 'SET_ACTIVE_SONG';
export function setActiveSong(song) {
  return {
    type: SET_ACTIVE_SONG,
    song: song
  };
}

export const SET_QUEUE = 'SET_QUEUE';
export function setQueue(songs) {
  return {
    type: SET_QUEUE,
    songs: songs
  };
}

export const SET_HISTORY = 'SET_HISTORY';
export function setHistory(songs) {
  return {
    type: SET_HISTORY,
    songs: songs
  };
}

export const SET_TO_PLAY = 'SET_TO_PLAY';
export function setToPlay() {
  return {
    type: SET_TO_PLAY,
    isPlaying: true
  };
}

export const SET_TO_PAUSE = 'SET_TO_PAUSE';
export function setToPause() {
  return {
    type: SET_TO_PAUSE,
    isPlaying: false
  };
}
