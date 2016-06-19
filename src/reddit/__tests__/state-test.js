import { expect } from 'chai';

import { REDDIT_ACTIONS, REDDIT_SORT_TYPES, REDDIT_SORT_RANGES } from 'reddit/constants.js';
import { redditDomain, redditReducer } from '../state.js';
import { configureStore } from 'core/state.js';


describe('reddit state management', () => {
  let initialState;

  beforeEach(() => {
    const store = configureStore();
    initialState = store.getState()[redditDomain()];
  });

  describe('initial state', () => {
    it('should have the expected initial state', () => {
      expect(initialState).to.deep.equal({
        sourceUrl: 'https://www.reddit.com/r/listentothis',
        posts: [],
        sortType: 'HOT',
        sortRange: 'DAY'
      });
    });
  });

  describe('set source url reducer', () => {
    it('should set source url', () => {
      initialState.posts = [{ foo: 'bar' }];
      initialState.sourceUrl = 'https://old.url.baz';
      const url = 'https://new.url.baz';
      const payload = { url };
      const action = { type: REDDIT_ACTIONS.SET_SOURCE_URL, payload };
      const newState = redditReducer(initialState, action);
      expect(newState.sourceUrl).to.equal(url);
      expect(newState.posts).to.deep.equal([]);  // should invalidate posts
    });

    it('should do nothing if source url is not changed', () => {
      initialState.posts = [{ foo: 'bar' }];
      initialState.sourceUrl = 'https://same.url.baz';
      const url = 'https://same.url.baz';
      const payload = { url };
      const action = { type: REDDIT_ACTIONS.SET_SOURCE_URL, payload };
      const newState = redditReducer(initialState, action);
      expect(newState.sourceUrl).to.equal(url);
      expect(newState.posts).to.deep.equal([{ foo: 'bar' }]);
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

  describe('set sort type reducer', () => {
    it('should set sort type', () => {
      initialState.posts = [{ foo: 'bar' }];
      initialState.sortType = REDDIT_SORT_TYPES.HOT;
      const sortType = REDDIT_SORT_TYPES.TOP;
      const payload = { sortType };
      const action = { type: REDDIT_ACTIONS.SET_SORT_TYPE, payload };
      const newState = redditReducer(initialState, action);
      expect(newState.sortType).to.equal(sortType);
      expect(newState.posts).to.deep.equal([]);  // should invalidate posts
    });

    it('should do nothing if sort type is not changed', () => {
      initialState.posts = [{ foo: 'bar' }];
      initialState.sortType = REDDIT_SORT_TYPES.HOT;
      const sortType = REDDIT_SORT_TYPES.HOT;
      const payload = { sortType };
      const action = { type: REDDIT_ACTIONS.SET_SORT_TYPE, payload };
      const newState = redditReducer(initialState, action);
      expect(newState.sortType).to.equal(sortType);
      expect(newState.posts).to.deep.equal([{ foo: 'bar' }]);
    });
  });

  describe('set sort range reducer', () => {
    it('should set range type', () => {
      initialState.posts = [{ foo: 'bar' }];
      initialState.sortRange = REDDIT_SORT_RANGES.DAY;
      const sortRange = REDDIT_SORT_RANGES.WEEK;
      const payload = { sortRange };
      const action = { type: REDDIT_ACTIONS.SET_SORT_RANGE, payload };
      const newState = redditReducer(initialState, action);
      expect(newState.sortRange).to.equal(sortRange);
      expect(newState.posts).to.deep.equal([]);  // should invalidate posts
    });

    it('should do nothing if sort range is not changed', () => {
      initialState.posts = [{ foo: 'bar' }];
      initialState.sortRange = REDDIT_SORT_RANGES.DAY;
      const sortRange = REDDIT_SORT_RANGES.DAY;
      const payload = { sortRange };
      const action = { type: REDDIT_ACTIONS.SET_SORT_RANGE, payload };
      const newState = redditReducer(initialState, action);
      expect(newState.sortRange).to.equal(sortRange);
      expect(newState.posts).to.deep.equal([{ foo: 'bar' }]);
    });
  });
});
