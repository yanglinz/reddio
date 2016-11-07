import _ from 'lodash';

export const PLAYER_TARGETS = {
  YOUTUBE: 'youtube',
  SOUNDCLOUD: 'soundcloud',
}

/**
 * Define player state that represent the current state of the iframe players
 */
const _PLAYER_STATES = [
  'LOADING',
  'LOADED',
  'PLAYING',
  'PAUSED',
  'ENDED',
];

export const PLAYER_STATES = _.zipObject(_PLAYER_STATES, _PLAYER_STATES);

/**
 * Define redux action names to modify the state atom
 */
const _PLAYER_ACTIONS = [
  'LOAD_IFRAME',
  'LOAD_IFRAME_DONE',
  'LOAD_IFRAME_FAIL',
  'PLAY_COMMAND',
  'PLAYING',
  'PAUSE_COMMAND',
  'PAUSING',
  'ON_EVENT',
];

export const PLAYER_ACTIONS = _.zipObject(_PLAYER_ACTIONS, _PLAYER_ACTIONS);
