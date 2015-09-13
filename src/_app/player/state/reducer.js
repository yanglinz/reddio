import { extend } from 'lodash';
import { SET_ACTIVE_SONG, SET_QUEUE, SET_TO_PLAY, SET_TO_PAUSE } from 'player/state/actions.js';

const initialState = {
  isPlaying: false,
  activeSong: {},
  queue: [],
  history: []
};

function servicesReducer(state=initialState, action={}) {
  switch (action.type) {
  case SET_ACTIVE_SONG:
    return extend({}, state, {
      isPlaying: true,
      activeSong: action.song
    });
  case SET_QUEUE:
    return extend({}, state, {
      queue: action.songs
    });
  case SET_TO_PLAY:
    return extend({}, state, {
      isPlaying: true
    });
  case SET_TO_PAUSE:
    return extend({}, state, {
      isPlaying: false
    });
  default:
    return state;
  }
}

export default servicesReducer;
