import _ from 'lodash';
import Rx from 'rx';
import { initialState as playerInitialState, mutators as playerStateMutators } from '../player/state.js';
import { initialState as redditInitialState, mutators as redditStateMutators } from '../reddit/state.js';
import { PlayerActionTypes, RedditActionTypes } from './constants.js';
import { dispatcherStream } from './dispatcher.js';
import { logError } from './utils.js';

let appStateStream = new Rx.Subject();

let initialState = _.extend({}, playerInitialState, redditInitialState);
let stateMutators = _.extend({}, playerStateMutators, redditStateMutators);

let appState = {
  state: initialState,

  getState() {
    return this.state;
  },

  mutate(action) {
    let mutator = stateMutators[action.type];
    this.state = mutator(action, this.state);
    appStateStream.onNext('CHANGE');
  }
};

dispatcherStream.subscribe(function onNext(action) {
  appState.mutate(action);
});

export { appStateStream, appState };
