import _ from 'lodash';
import { expect } from 'chai';

import { PLAYER_TARGETS, PLAYER_STATES, PLAYER_ACTIONS } from 'player/constants';
import { configureStore } from 'core/store';
import {
  selectIsYoutubeActive,
  selectIsSoundcloudActive,
  playerReducer,
} from 'player/reducer';

describe('player reducer', () => {
  let initialState;
  let initialPlayerState;

  beforeEach(() => {
    const store = configureStore();
    initialState = store.getState();
    initialPlayerState = initialState.player;
  });

  describe('player active predicate selector', () => {
    it('should select youtube is active', () => {
      const data = { url: 'https://youtu.be/abc123' };
      const stubPost = { data };

      initialState.player.currentPost = stubPost;
      const isYoutubeActive = selectIsYoutubeActive(initialState);
      expect(isYoutubeActive).to.equal(true);
    });

    it('should select soundcloud is active', () => {
      const data = { url: 'https://soundcloud.com/abc/123' };
      const stubPost = { data };

      initialState.player.currentPost = stubPost;
      const isSoundcloudActive = selectIsSoundcloudActive(initialState);
      expect(isSoundcloudActive).to.equal(true);
    });

    it('should select inactive state', () => {
      expect(selectIsYoutubeActive(initialState)).to.equal(false);
      expect(selectIsSoundcloudActive(initialState)).to.equal(false);
    });
  });

  describe('initial state', () => {
    it('should have the expected initial state', () => {
      expect(initialPlayerState).to.deep.equal({
        currentState: {
          [PLAYER_TARGETS.YOUTUBE]: PLAYER_STATES.LOADING,
          [PLAYER_TARGETS.SOUNDCLOUD]: PLAYER_STATES.LOADING,
        },
        songs: {},
        currentPost: null,
        queue: [],
        shuffledQueue: [],
        history: [],
      });
    });
  });

  describe('set ready reducer', () => {
    it('should set current state to loaded', () => {
      const action = { type: PLAYER_ACTIONS.LOAD_IFRAME_DONE };
      const newState = playerReducer(initialPlayerState, action);

      const expectedCurrentState = {
        [PLAYER_TARGETS.YOUTUBE]: PLAYER_STATES.LOADED,
        [PLAYER_TARGETS.SOUNDCLOUD]: PLAYER_STATES.LOADED,
      };
      expect(newState.currentState).to.deep.equal(expectedCurrentState);
    });
  });

  describe('set current post reducer', () => {
    it('should set current post', () => {
      const stubPost = { foo: 'bar' };
      const payload = { post: stubPost };
      const action = { type: PLAYER_ACTIONS.PLAY_COMMAND, payload };
      const newState = playerReducer(initialPlayerState, action);

      const expectedNewState = _.assign({}, initialPlayerState, {
        currentPost: stubPost,
      });
      expect(newState).to.deep.equal(expectedNewState);
    });
  });

  describe('set state reducer', () => {
    beforeEach(() => {
      initialPlayerState.currentState = {
        [PLAYER_TARGETS.YOUTUBE]: PLAYER_STATES.LOADED,
        [PLAYER_TARGETS.SOUNDCLOUD]: PLAYER_STATES.LOADED,
      };
    });

    it('should set youtube state to playing', () => {
      const target = PLAYER_TARGETS.YOUTUBE;
      const state = PLAYER_STATES.PLAYING;
      const payload = { target, state };
      const action = { type: PLAYER_ACTIONS.ON_EVENT, payload };
      const newState = playerReducer(initialPlayerState, action);

      const expectedNewState = _.assign({}, initialPlayerState, {
        currentState: {
          [PLAYER_TARGETS.YOUTUBE]: PLAYER_STATES.PLAYING,
          [PLAYER_TARGETS.SOUNDCLOUD]: PLAYER_STATES.LOADED,
        },
      });
      expect(newState).to.deep.equal(expectedNewState);
    });

    it('should set youtube state to playing', () => {
      const target = PLAYER_TARGETS.SOUNDCLOUD;
      const state = PLAYER_STATES.PLAYING;
      const payload = { target, state };
      const action = { type: PLAYER_ACTIONS.ON_EVENT, payload };
      const newState = playerReducer(initialPlayerState, action);

      const expectedNewState = _.assign({}, initialPlayerState, {
        currentState: {
          [PLAYER_TARGETS.YOUTUBE]: PLAYER_STATES.LOADED,
          [PLAYER_TARGETS.SOUNDCLOUD]: PLAYER_STATES.PLAYING,
        },
      });
      expect(newState).to.deep.equal(expectedNewState);
    });
  });
});
