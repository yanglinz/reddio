import { isEmpty, extend, initial, first, last, rest } from 'lodash';
import {
  SET_ACTIVE_SONG,
  SET_QUEUE,
  SET_TO_PLAY,
  SET_TO_PAUSE,
  PLAY_NEXT_SONG,
  PLAY_PREV_SONG
} from 'player/state/actions.js';

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
  case PLAY_NEXT_SONG:
    if (!isEmpty(state.queue)) {
      state.isPlaying = true;
      state.history.push(state.activeSong);
      state.activeSong = first(state.queue) || {};
      state.queue = rest(state.queue) || {};
    }
    return state;
  case PLAY_PREV_SONG:
    if (!isEmpty(state.history)) {
      state.isPlaying = true;
      state.queue = [].concat(state.activeSong).concat(state.queue);
      state.activeSong = last(state.history) || {};
      state.history = initial(state.history) || [];
    }
    return state;
  default:
    return state;
  }
}

export default servicesReducer;
