import { expect } from 'chai';

import { REDDIT_ACTIONS } from 'reddit/constants';
import { configureStore } from 'core/state';
import { redditDomain, redditReducer } from '../state';


describe('reddit state management', () => {
  let initialState;

  beforeEach(() => {
    const store = configureStore();
    initialState = store.getState()[redditDomain()];
  });

  describe('initial state', () => {
    it('should have the expected initial state', () => {
      expect(initialState).to.deep.equal({
        subreddit: null,
        sortType: null,
        sortRange: null,
        posts: []
      });
    });
  });

  describe('route change reducer', () => {
    it('should set new subreddit and sortType', () => {
      const pathname = '/r/listentothis/hot';
      const payload = { pathname };
      const action = { type: REDDIT_ACTIONS.ROUTER_LOCATION_CHANGE, payload };
      const newState = redditReducer(initialState, action);
      expect(newState).to.deep.equal({
        subreddit: 'listentothis',
        sortType: 'hot',
        sortRange: null,
        posts: []
      });
    });

    it('should set new subreddit, sortType, and sortRange', () => {
      const pathname = '/r/listentothis/top/week';
      const payload = { pathname };
      const action = { type: REDDIT_ACTIONS.ROUTER_LOCATION_CHANGE, payload };
      const newState = redditReducer(initialState, action);
      expect(newState).to.deep.equal({
        subreddit: 'listentothis',
        sortType: 'top',
        sortRange: 'week',
        posts: []
      });
    });

    it('should noop if route does not match', () => {
      const pathname = '/r/foobar';
      const payload = { pathname };
      const action = { type: REDDIT_ACTIONS.ROUTER_LOCATION_CHANGE, payload };
      const newState = redditReducer(initialState, action);
      expect(newState).to.deep.equal({
        subreddit: null,
        sortType: null,
        sortRange: null,
        posts: []
      });
    });
  });

  describe('receive posts reducer', () => {
    it('should receive posts on empty posts', () => {
      initialState.posts = [];
      const newPosts = [{ foo: 'bar' }];
      const payload = { posts: newPosts };
      const action = { type: REDDIT_ACTIONS.RECEIVE_POSTS, payload };
      const newState = redditReducer(initialState, action);
      expect(newState.posts).to.deep.equal([{ foo: 'bar' }]);
    });

    it('should receive posts on existing posts', () => {
      initialState.posts = [{ foo: 'bar' }];
      const newPosts = [{ bar: 'baz' }];
      const payload = { posts: newPosts };
      const action = { type: REDDIT_ACTIONS.RECEIVE_POSTS, payload };
      const newState = redditReducer(initialState, action);
      expect(newState.posts).to.deep.equal([{ foo: 'bar' }, { bar: 'baz' }]);
    });
  });
});
