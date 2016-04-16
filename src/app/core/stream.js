import _ from 'lodash';
import rx from 'rxjs';

import { playerStreamReducer } from 'player/stream.js';

/**
 * Source stream types
 */
export const SOURCE_TYPES = {
  EVENT: 'EVENT',
  COMMAND: 'COMMAND'
}

/**
 * Create singleton source and sink subject streams
 * Source stream represents incoming events and commands
 * Sink stream represents filtered actions that will be given to redux actions
 */
const _source$ = rx.Subject();
const _sink$ = rx.Subject();

/**
 * Dispatch an event to the source stream
 */
export function dispatchEvent(payload, stream = _source$) {
  payload = assign(payload, { __type: SOURCE_TYPES.EVENT });
  stream.onNext(payload);
}

/**
 * Dispatch a command to source stream
 */
export function dispatchCommand(payload, stream = _source$) {
  payload = assign(payload, { __type: SOURCE_TYPES.COMMAND });
  stream.onNext(payload);
}

const defaultStreamReducers = [
  playerStreamReducer
];

/**
 * Apply a set of reducing functions to the source stream
 * These transforming functions will ultimately map a single source stream to a single sink stream
 */
export function applyReducers(source$ = _source$, streamReducers = defaultStreamReducers) {
  const streams = _.map(streamReducers, (streamReducer) => streamReducer(source$));
  return rx.Observable.merge(streams);
}

/**
 * Register stream to dispatch sink stream actions to redux store
 */
export function registerStreams(source$ = _source$, sink$ = _sink$) {
  const sink$ = applyReducers(source$, defaultStreamReducers);
}
