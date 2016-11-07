import { expect } from 'chai';

import { PLAYER_TARGETS, PLAYER_STATES } from 'player/constants';
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
        currentState: {
          [PLAYER_TARGETS.YOUTUBE]: PLAYER_STATES.LOADING,
          [PLAYER_TARGETS.SOUNDCLOUD]: PLAYER_STATES.LOADING,
        },
        songs: {},
        currentSong: null,
        queue: [],
        shuffledQueue: [],
        history: [],
      });
    });
  });
});
