import { expect } from 'chai';

import { PLAYER_STATES } from 'player/constants';
import { configureStore } from 'core/store';


describe('player reducer', () => {
  let initialState;

  beforeEach(() => {
    const store = configureStore();
    initialState = store.getState().player;
  });

  describe('initial state', () => {
    it('should have the expected initial state', () => {
      expect(initialState).to.deep.equal({
        state: PLAYER_STATES.LOADING,
        songs: {},
        currentSong: null,
        queue: [],
        shuffledQueue: [],
        history: []
      });
    });
  });
});
