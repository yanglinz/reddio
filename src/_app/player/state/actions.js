export const SET_ACTIVE_SONG = 'SET_ACTIVE_SONG';

export function setActiveSong(song) {
  return {
    type: SET_ACTIVE_SONG,
    song: song
  };
}
