import _ from 'lodash';
import Rx from 'rx';
import getPlayerReducer, { initialPlayerState } from './reducers/player.js';
import getRedditReducer, { initialRedditState } from './reducers/reddit.js';
import { PlayerActionTypes, RedditActionTypes } from '../actions/action.constants.js';
import { dispatcherStream } from '../dispatcher.js';
import { logError } from '../lib/logger.js';

let appStateStream = new Rx.Subject();

let appState = {
  state: _.extend({}, initialPlayerState, initialRedditState),

  getState() {
    return this.state;
  },

  mutate(action) {
    let mutator;

    if (_.includes(PlayerActionTypes, action.type)) {
      mutator = getPlayerReducer(action);
    } else if (_.includes(RedditActionTypes, action.type)) {
      mutator = getRedditReducer(action);
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
