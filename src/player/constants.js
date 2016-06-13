import _ from 'lodash';

/**
 * Define player source events that originate from views or the iframe players
 */
const _PLAYER_EVENTS = [
  'LOAD_PLAYER_INIT',
  'LOAD_PLAYER_FAILED',
  'PRESS_PLAY',
  'PRESS_PAUSE',
  'PRESS_NEXT',
  'PRESS_PREVIOUS'
];

export const PLAYER_EVENTS = _.zipObject(
  _PLAYER_EVENTS,
  _.map(_PLAYER_EVENTS, (name) => `EVENT:${name}`));

/**
 * Define player state that represent the current state of the iframe players
 */
const _PLAYER_STATES = [
  'LOADING',
  'READY',
  'PAUSED',
  'PLAYING'
];

export const PLAYER_STATES = _.zipObject(_PLAYER_STATES, _PLAYER_STATES);

/**
 * Define redux action names to modify the state atom
 */
const _PLAYER_ACTIONS = [
  'SET_STATE',
  'SET_QUEUE',
  'SET_CURRENT_SONG',
  'SET_NEXT_SONG',
  'SET_PREVIOUS_SONG',
  'SHUFFLE',
  'UNSHUFFLE'
];

export const PLAYER_ACTIONS = _.zipObject(_PLAYER_ACTIONS, _PLAYER_ACTIONS);
