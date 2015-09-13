import { extend } from 'lodash';
import { SET_ACTIVE_SONG, SET_QUEUE } from 'player/state/actions.js';

const initialState = {
  activeSong: {},
  queue: []
};

function servicesReducer(state=initialState, action={}) {
  switch (action.type) {
  case SET_ACTIVE_SONG:
    return extend({}, state, {
      activeSong: action.song
    });
  case SET_QUEUE:
    return extend({}, state, {
      queue: action.songs
    });
  default:
    return state;
  }
}

export default servicesReducer;
