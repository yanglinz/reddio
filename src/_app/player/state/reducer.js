import { extend } from 'lodash';
import { SET_ACTIVE_SONG } from './actions.js';

const initialState = {
  activeSong: {}
};

function servicesReducer(state=initialState, action={}) {
  switch (action.type) {
  case SET_ACTIVE_SONG:
    return extend({}, state, {
      activeSong: action.song
    });
  default:
    return state;
  }
}

export default servicesReducer;
