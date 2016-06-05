import _ from 'lodash';
import rx from 'rxjs/Rx';

import { playerStreamReducer } from 'player/stream.js';

/**
 * Create singleton source and sink subject streams
 * Source stream represents incoming events and commands
 * Sink stream represents filtered actions that will be given to redux actions
 */
const defaultSource$ = new rx.Subject();
const defaultSink$ = new rx.Subject();

/**
 * Dispatch an event to the source stream
 */
export function dispatchEvent(payload, source$ = defaultSource$) {
  source$.next(payload);
}

const defaultReducers = [
  playerStreamReducer
];

/**
 * Apply a set of reducing functions to the source stream
 * These transforming functions will ultimately map a single source stream to a single sink stream
 */
export function applyReducers(
    reducers = defaultReducers, source$ = defaultSource$, sink$ = defaultSink$) {
  const streams = _.map(reducers, (streamReducer) => streamReducer(source$));
  const merged$ = rx.Observable.merge(...streams);
  merged$.subscribe(action => sink$.next(action));
  return sink$;
}
