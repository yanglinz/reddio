/**
 * Define player source events that originate from views or the iframe players
 */
export const PLAYER_EVENTS = {
  LOAD_PLAYER: 'PLAYER:PRESS_PLAY',
  LOAD_PLAYER_FAILED: 'PLAYER:LOAD_PLAYER_FAILED',
  LOAD_SONG: 'PLAYER:LOAD_SONG',
  LOAD_SONG_FAILED: 'PLAYER:LOAD_SONG_FAILED',
  PRESS_PLAY: 'PLAYER:PLAY_SONG',
  PRESS_PAUSE: 'PLAYER:PAUSE_SONG',
  PRESS_NEXT: 'PLAYER:PRESS_NEXT',
  PRESS_PREVIOUS: 'PLAYER:PRESS_PREVIOUS'
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
export const PLAYER_ACTIONS = {
  SET_STATE: 'PLAYER:SET_STATE',
  SET_QUEUE: 'PLAYER:SET_QUEUE',
  SET_CURRENT_SONG: 'PLAYER:SET_CURRENT_SONG',
  SET_NEXT_SONG: 'PLAYER:SET_NEXT_SONG',
  SET_PREVIOUS_SONG: 'PLAYER:SET_PREVIOUS_SONG',
  SHUFFLE: 'PLAYER:SHUFFLE',
  UNSHUFFLE: 'PLAYER:UNSHUFFLE'
};
