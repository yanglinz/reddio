export const SET_ACTIVE_SONG = 'SET_ACTIVE_SONG';
export function setActiveSong(song) {
  return {
    type: SET_ACTIVE_SONG,
    song: song
  };
}

export const SET_SONGS = 'SET_SONGS';
export function setSongs(songs) {
  return {
    type: SET_SONGS,
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

export const PLAY_NEXT_SONG = 'PLAY_NEXT_SONG';
export function playNextSong() {
  return {
    type: PLAY_NEXT_SONG
  };
}

export const PLAY_PREV_SONG = 'PLAY_PREV_SONG';
export function playPrevSong() {
  return {
    type: PLAY_PREV_SONG
  };
}
