import _ from 'lodash';
import { expect } from 'chai';

import { PLAYER_STATES, PLAYER_STATE_TRANSITIONS } from 'player/constants.js';
import { configureStore } from 'core/state.js';


describe('player state management', () => {
  let store;

  beforeEach(() => {
    store = configureStore();
  });

  describe('set state reducer', () => {
    it('should set state new player state', () => {
      const initialState = store.getState();
      const payload = { state: PLAYER_STATES.PLAYING };
      const action = { type: PLAYER_STATE_TRANSITIONS.SET_STATE, payload };

      const expectedState = _.cloneDeep(initialState);
      expectedState.player.state = payload.state;
      store.dispatch(action);
      expect(store.getState()).to.deep.equal(expectedState);
    });
  });
});
