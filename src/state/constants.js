/**
 * Application event name constants
 */
export const EVENTS = {
  LOAD_IFRAME: 'LOAD_IFRAME',
  LOAD_IFRAME_DONE: 'LOAD_IFRAME_DONE',
  LOAD_IFRAME_FAIL: 'LOAD_IFRAME_FAIL',
  PLAY_COMMAND: 'PLAY_COMMAND',
  PLAYING: 'PLAYING',
  PAUSE_COMMAND: 'PAUSE_COMMAND',
  PAUSING: 'PAUSING',
  ON_EVENT: 'ON_EVENT',
  NOOP: 'NOOP',
};

/**
 * iFrame player names
 */
export const PLAYER_TARGETS = {
  YOUTUBE: 'youtube',
  SOUNDCLOUD: 'soundcloud',
};

/**
 * Player state that represent the current state of the iframe players
 */
export const PLAYER_STATES = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  ENDED: 'ENDED',
};
