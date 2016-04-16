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
export function dispatchEvent(payload, source$ = _source$) {
  payload = assign(payload, { __type: SOURCE_TYPES.EVENT });
  source$.onNext(payload);
}

/**
 * Dispatch a command to source stream
 */
export function dispatchCommand(payload, source$ = _source$) {
  payload = assign(payload, { __type: SOURCE_TYPES.COMMAND });
  source$.onNext(payload);
}

const defaultReducers = [
  playerStreamReducer
];

/**
 * Apply a set of reducing functions to the source stream
 * These transforming functions will ultimately map a single source stream to a single sink stream
 */
export function applyReducers(reducers = defaultReducers, source$ = _source$, sink$ = _sink$) {
  const streams = _.map(reducers, (streamReducer) => streamReducer(source$));
  source$.subscribe(sink$.onNext);
}
