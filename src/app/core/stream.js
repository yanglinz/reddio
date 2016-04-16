import _ from 'lodash';
import Rx from 'rxjs';

import { playerStreamReducer } from 'player/stream.js';

/**
 * Create singleton source and sink subject streams
 * Source stream represents incoming events and commands
 * Sink stream represents filtered actions that will be given to redux actions
 */
const _source$ = Rx.Subject();
const _sink$ = Rx.Subject();

/**
 * Dispatch an event or command to the source stream
 */
export function dispatchToStream(source$ = _source$, payload) {
  source$.onNext(payload);
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
  return Rx.Observable.merge(streams);
}

/**
 * Register stream to dispatch sink stream actions to redux store
 */
export function registerStreams(source$ = _source$, sink$ = _sink$) {
  const sink$ = reduceStream(source$, defaultStreamReducers);
}
