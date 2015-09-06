import { extend } from 'lodash';
import { SET_ROUTER_STATE } from 'core/store/actions.js';

const initialState = {};

function routerReducer(state=initialState, action={}) {
  switch (action.type) {
  case SET_ROUTER_STATE:
    return extend({}, state, action.routerState);
  default:
    return state;
  }
}

export default routerReducer;
