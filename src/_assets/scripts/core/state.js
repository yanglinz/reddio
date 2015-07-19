import _ from 'lodash';
import Rx from 'rx';
import getPlayerMutator, { getInitialPlayerState } from '../player/state.js';
import getRedditMutator, { getInitialRedditState } from '../reddit/state.js';
import { PlayerActionTypes, RedditActionTypes } from './constants.js';
import { dispatcherStream } from './dispatcher.js';
import { logError } from './utils.js';

let appStateStream = new Rx.Subject();

let appState = {
  state: _.extend({}, getInitialPlayerState(), getInitialRedditState()),

  getState() {
    return this.state;
  },

  mutate(action) {
    let mutator;

    if (_.includes(PlayerActionTypes, action.type)) {
      mutator = getPlayerMutator(action);
    } else if (_.includes(RedditActionTypes, action.type)) {
      mutator = getRedditMutator(action);
    } else {
      logError(`No mutator found for action: ${action}`);
    }

    this.state = mutator(this.state);
    appStateStream.onNext('CHANGE');
  }
};

dispatcherStream.subscribe(function onNext(action) {
  appState.mutate(action);
});

export { appStateStream, appState };
