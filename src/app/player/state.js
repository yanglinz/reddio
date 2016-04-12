import { PLAYER_STATES } from 'player/constants.js';

/**
 * Get initial player state
 */
export function initialState() {
  return {
    state: PLAYER_STATES.LOADING,
    songs: {},
    currentSong: null,
    queue: [],
    shuffledQueue: [],
    history: []
  };
}
