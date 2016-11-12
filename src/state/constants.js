/**
 * Application event name constants
 */
export const EVENTS = {
  ROUTER_LOCATION_CHANGE: '@@router/LOCATION_CHANGE',
  LOAD_IFRAME: 'LOAD_IFRAME',
  LOAD_IFRAME_DONE: 'LOAD_IFRAME_DONE',
  LOAD_IFRAME_FAIL: 'LOAD_IFRAME_FAIL',
  PLAY_COMMAND: 'PLAY_COMMAND',
  PLAYING: 'PLAYING',
  PAUSE_COMMAND: 'PAUSE_COMMAND',
  PAUSING: 'PAUSING',
  ON_EVENT: 'ON_EVENT',
  REQUEST_POSTS: 'REQUEST_POSTS',
  RECEIVE_POSTS: 'RECEIVE_POSTS',
  FETCH_POSTS_ERROR: 'FETCH_POSTS_ERROR',
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

/**
 * Reddit sort types
 */
export const REDDIT_SORT_TYPES = {
  hot: 'hot',
  new: 'new',
  rising: 'rising',
  controversial: 'controversial',
  random: 'random',
  top: 'top',
};

/**
 * Reddit sort ranges
 */
export const REDDIT_SORT_RANGES = {
  hour: 'hour',
  day: 'day',
  week: 'week',
  month: 'month',
  year: 'year',
  all: 'all',
};
