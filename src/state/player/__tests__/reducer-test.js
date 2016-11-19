import _ from 'lodash';
import { expect } from 'chai';

import { PLAYER_TARGETS, PLAYER_STATES, EVENTS } from 'state/constants';
import { configureStore } from 'state/store';
import * as actions from '../actions';
import {
  selectIsYoutubeActive,
  selectIsSoundcloudActive,
  selectNextPost,
  selectPrevPost,
  playerReducer,
} from '../reducer';

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
      initialState.player.postsByIds = {
        foo: { url: 'https://youtu.be/abc123' },
      };
      initialState.player.currentPost = 'foo';

      const isYoutubeActive = selectIsYoutubeActive(initialState);
      expect(isYoutubeActive).to.equal(true);
    });

    it('should select soundcloud is active', () => {
      initialState.player.postsByIds = {
        foo: { url: 'https://soundcloud.com/abc/123' },
      };
      initialState.player.currentPost = 'foo';

      const isSoundcloudActive = selectIsSoundcloudActive(initialState);
      expect(isSoundcloudActive).to.equal(true);
    });

    it('should select inactive state', () => {
      expect(selectIsYoutubeActive(initialState)).to.equal(false);
      expect(selectIsSoundcloudActive(initialState)).to.equal(false);
    });
  });

  describe('next post selector', () => {
    it('should select next post', () => {
      initialState.player.postsByIds = {
        foo: { url: 'https://soundcloud.com/abc/123' },
        bar: { url: 'https://soundcloud.com/abc/456' },
      };
      initialState.player.posts = ['foo', 'bar'];
      initialState.player.currentPost = 'foo';

      expect(selectNextPost(initialState)).to.deep.equal({
        url: 'https://soundcloud.com/abc/456',
      });
    });

    it('should select empty next post', () => {
      initialState.player.postsByIds = {
        foo: { url: 'https://soundcloud.com/abc/123' },
      };
      initialState.player.posts = ['foo'];
      initialState.player.currentPost = 'foo';

      expect(selectNextPost(initialState)).to.equal(undefined);
    });
  });

  describe('prev post selector', () => {
    it('should select prev post', () => {
      initialState.player.postsByIds = {
        foo: { url: 'https://soundcloud.com/abc/123' },
        bar: { url: 'https://soundcloud.com/abc/456' },
      };
      initialState.player.posts = ['foo', 'bar'];
      initialState.player.currentPost = 'bar';

      expect(selectPrevPost(initialState)).to.deep.equal({
        url: 'https://soundcloud.com/abc/123',
      });
    });

    it('should select empty prev post', () => {
      initialState.player.postsByIds = {
        foo: { url: 'https://soundcloud.com/abc/123' },
      };
      initialState.player.posts = ['foo'];
      initialState.player.currentPost = 'foo';

      expect(selectPrevPost(initialState)).to.equal(undefined);
    });
  });

  describe('initial state', () => {
    it('should have the expected initial state', () => {
      expect(initialPlayerState).to.deep.equal({
        currentState: {
          [PLAYER_TARGETS.YOUTUBE]: PLAYER_STATES.LOADING,
          [PLAYER_TARGETS.SOUNDCLOUD]: PLAYER_STATES.LOADING,
        },
        postsByIds: {},
        posts: [],
        currentPost: null,
      });
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
      const event = { target, state };
      const action = actions.onEvent(event);
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
      const action = { type: EVENTS.ON_EVENT, payload };
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

  describe('set ready reducer', () => {
    it('should set current state to loaded', () => {
      const action = { type: EVENTS.LOAD_IFRAME_DONE };
      const newState = playerReducer(initialPlayerState, action);

      const expectedCurrentState = {
        [PLAYER_TARGETS.YOUTUBE]: PLAYER_STATES.LOADED,
        [PLAYER_TARGETS.SOUNDCLOUD]: PLAYER_STATES.LOADED,
      };
      expect(newState.currentState).to.deep.equal(expectedCurrentState);
    });
  });

  describe('receive posts reducer', () => {
    it('should receive posts', () => {
      const stubPosts = [{ id: 'foo' }, { id: 'bar' }];
      const action = actions.receivePosts(stubPosts);
      const newState = playerReducer(initialPlayerState, action);

      const expectedNewState = _.assign({}, initialPlayerState, {
        postsByIds: {
          foo: { id: 'foo' },
          bar: { id: 'bar' },
        },
        posts: ['foo', 'bar'],
      });
      expect(newState).to.deep.equal(expectedNewState);
    });
  });

  describe('post command reducer', () => {
    it('should set current post', () => {
      const stubPost = { id: 'foo' };
      const action = actions.playing(stubPost);
      const newState = playerReducer(initialPlayerState, action);

      const expectedNewState = _.assign({}, initialPlayerState, {
        currentPost: 'foo',
      });
      expect(newState).to.deep.equal(expectedNewState);
    });

    it('should set next post', () => {
      initialPlayerState.posts = ['foo', 'bar'];
      initialPlayerState.currentPost = 'foo';
      const action = actions.nextPlaying();
      const newState = playerReducer(initialPlayerState, action);

      const expectedNewState = _.assign({}, initialPlayerState, {
        currentPost: 'bar',
      });
      expect(newState).to.deep.equal(expectedNewState);
    });

    it('should set empty next post', () => {
      initialPlayerState.posts = ['foo'];
      initialPlayerState.currentPost = 'foo';
      const action = actions.nextPlaying();
      const newState = playerReducer(initialPlayerState, action);

      const expectedNewState = _.assign({}, initialPlayerState, {
        currentPost: undefined,
      });
      expect(newState).to.deep.equal(expectedNewState);
    });

    it('should set prev post', () => {
      initialPlayerState.posts = ['foo', 'bar'];
      initialPlayerState.currentPost = 'bar';
      const action = actions.prevPlaying();
      const newState = playerReducer(initialPlayerState, action);

      const expectedNewState = _.assign({}, initialPlayerState, {
        currentPost: 'foo',
      });
      expect(newState).to.deep.equal(expectedNewState);
    });

    it('should set empty prev post', () => {
      initialPlayerState.posts = ['foo'];
      initialPlayerState.currentPost = 'foo';
      const action = actions.prevPlaying();
      const newState = playerReducer(initialPlayerState, action);

      const expectedNewState = _.assign({}, initialPlayerState, {
        currentPost: undefined,
      });
      expect(newState).to.deep.equal(expectedNewState);
    });
  });
});
