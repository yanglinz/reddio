import _ from 'lodash';
import Rx from 'rxjs';

import { playerStreamReducer } from 'player/stream.js';

/**
 * Define singleton streams.
 * Source stream represents incoming actions
 * Sink stream represents filtered actions that will be given to redux actions
 */
const _source$ = Rx.Subject();
const _sink$ = Rx.Subject();

/**
 * Define a function to dispatch an event to the source stream.
 */
export function dispatchToStream(source$ = _source$, payload) {
  source$.onNext(payload);
}

const defaultStreamReducers = [
  playerStreamReducer
];

/**
 * Apply a set of stream reducing functions to the source stream
 * @param {array} streamReducers - A list of reducing functions to apply to source stream
 * @returns {object} - Reduced stream
 */
export function reduceStream(source$ = _source$, streamReducers = defaultStreamReducers) {
  const streams = _.map(streamReducers, (streamReducer) => streamReducer(source$));
  return Rx.Observable.merge(streams);
}

/**
 * Register stream to dispatch sink stream actions to redux store
 */
export function registerStream(source$ = _source$, sink$ = _sink$) {
  const sink$ = reduceStream(source$, defaultStreamReducers);
}

export function sourceStream() {
  return _source$;
}

export function sinkStream() {
  return _sink$;
}
