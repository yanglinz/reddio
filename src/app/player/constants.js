/**
 * Define player source events that originate from views or the iframe players
 */
export const PLAYER_SOURCE_EVENTS = {
  LOAD_PLAYER: 'PRESS_PLAY',
  LOAD_PLAYER_FAILED: 'LOAD_PLAYER_FAILED',
  LOAD_SONG: 'LOAD_SONG',
  LOAD_SONG_FAILED: 'LOAD_SONG_FAILED',
  PRESS_PLAY: 'PLAY_SONG',
  PRESS_PAUSE: 'PAUSE_SONG',
  PRESS_NEXT: 'PRESS_NEXT',
  PRESS_PREVIOUS: 'PRESS_PREVIOUS'
};

/**
 * Define player state that represent the current state of the iframe players
 */
export const PLAYER_STATES = {
  LOADING: 'LOADING',
  READY: 'READY',
  PAUSED: 'PAUSED',
  PLAYING: 'PLAYING'
};

/**
 * Define redux action names to modify the state atom
 */
export const PLAYER_STATE_TRANSITIONS = {
  SET_STATE: 'SET_STATE',
  SET_QUEUE: 'SET_QUEUE',
  SET_CURRENT_SONG: 'SET_CURRENT_SONG',
  SET_NEXT_SONG: 'SET_NEXT_SONG',
  SET_PREVIOUS_SONG: 'SET_PREVIOUS_SONG',
  SHUFFLE: 'SHUFFLE',
  UNSHUFFLE: 'UNSHUFFLE'
};

/**
 * Define player thunks to create composite events and transitions
 */
export const PLAYER_THUNKS = {
  PLAY_SONG: 'PLAY_SONG',
  RESET_SONG: 'RESET_SONG',
  PLAY_NEXT: 'PLAY_NEXT',
  PLAY_PREVIOUS: 'PLAY_PREVIOUS'
};
