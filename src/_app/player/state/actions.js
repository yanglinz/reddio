/**
 * Define action constants
 */

export const SET_ACTIVE_SONG = 'SET_ACTIVE_SONG';

/**
 * Define action creators
 */

export function setActiveSong(song) {
  return {
    type: SET_ACTIVE_SONG,
    song: song
  };
}
