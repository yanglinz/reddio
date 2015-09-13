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
