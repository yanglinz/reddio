import _ from 'lodash';
import { expect } from 'chai';

import { REDDIT_ACTIONS, REDDIT_SORT_TYPES } from 'reddit/constants';
import { configureStore } from 'core/store';
import { parseSortType, parseSortRange, redditReducer } from '../reducer';

describe('reddit reducer', () => {
  let initialState;

  beforeEach(() => {
    const store = configureStore();
    initialState = store.getState().reddit;
  });

  describe('initial state', () => {
    it('should have the expected initial state', () => {
      expect(initialState).to.deep.equal({
        pathname: null,
        query: null,
        sortType: null,
        sortRange: null,
        posts: []
      });
    });
  });

  describe('parse sort type helper', () => {
    it('should parse route into sort type', () => {
      const sortTypeByPathname = {
        '': null,
        '/': null,
        '/r/subreddit': REDDIT_SORT_TYPES.hot,
        '/r/subreddit/': REDDIT_SORT_TYPES.hot,
        '/r/subreddit/new': REDDIT_SORT_TYPES.new,
        '/r/subreddit/rising': REDDIT_SORT_TYPES.rising,
        '/r/subreddit/controversial': REDDIT_SORT_TYPES.controversial,
        '/r/subreddit/random': REDDIT_SORT_TYPES.random,
        '/r/subreddit/top': REDDIT_SORT_TYPES.top,
        '/user/username/m/multiname': REDDIT_SORT_TYPES.hot
      };
      _.each(sortTypeByPathname, (sortType, pathname) => {
        expect(parseSortType(pathname)).to.equal(sortType);
      });
    });
  });

  describe('parse sort range helper', () => {
    it('should parse route into sort range', () => {
      const sortRangeByRoute = new WeakMap([
        {
          pathname: '',
          query: {}
        }, null
      ]);
      _.each(sortTypeByPathname, (sortRange, route) => {
        const { pathanme, query } = route;
        expect(parseSortRange(pathname, query)).to.equal(sortRange);
      });
    });
  });

  describe('route change reducer', () => {
    const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

    it('should set new pathname and query', () => {
      const pathname = '/r/listentothis/hot';
      const query = null;
      const payload = { pathname, query };
      const action = { type: ROUTER_LOCATION_CHANGE, payload };
      const newState = redditReducer(initialState, action);

      expect(newState).to.deep.equal(_.assign({}, initialState, {
        pathname,
        query
      }));
    });

    it('should invalidate posts if pathname has changed', () => {
      initialState.pathname = '/r/listentothis/hot';
      initialState.posts = [{ foo: 'bar' }];

      const pathname = '/r/music/hot';
      const query = null;
      const payload = { pathname, query };
      const action = { type: ROUTER_LOCATION_CHANGE, payload };
      const newState = redditReducer(initialState, action);

      expect(newState).to.deep.equal(_.assign({}, initialState, {
        pathname,
        query,
        posts: []
      }));
    });

    it('should invalidate posts if query has changed', () => {
      initialState.pathname = '/r/listentothis/top';
      initialState.query = { sort: 'top', t: 'week' };
      initialState.posts = [{ foo: 'bar' }];

      const pathname = '/r/listentothis/top';
      const query = { sort: 'top', t: 'day' };
      const payload = { pathname, query };
      const action = { type: ROUTER_LOCATION_CHANGE, payload };
      const newState = redditReducer(initialState, action);

      expect(newState).to.deep.equal(_.assign({}, initialState, {
        pathname,
        query,
        posts: []
      }));
    });

    it('should not invalidate posts if params did not change', () => {
      initialState.pathname = '/r/listentothis/top';
      initialState.query = { sort: 'top', t: 'day' };
      initialState.posts = [{ foo: 'bar' }];

      const pathname = '/r/listentothis/top';
      const query = { sort: 'top', t: 'day' };
      const payload = { pathname, query };
      const action = { type: ROUTER_LOCATION_CHANGE, payload };
      const newState = redditReducer(initialState, action);

      expect(newState).to.deep.equal(_.assign({}, initialState));
    });
  });

  describe('receive posts reducer', () => {
    it('should receive posts on empty posts', () => {
      initialState.posts = [];

      const stubPosts = [{ foo: 'bar' }];
      const stubResponse = {
        data: { children: stubPosts }
      };
      const payload = { response: stubResponse };
      const action = { type: REDDIT_ACTIONS.RECEIVE_POSTS, payload };
      const newState = redditReducer(initialState, action);

      expect(newState.posts).to.deep.equal(stubPosts);
    });

    it('should receive posts with existing posts', () => {
      const initialPosts = [{ bar: 'baz' }];
      initialState.posts = initialPosts;

      const stubPosts = [{ foo: 'bar' }];
      const stubResponse = {
        data: { children: stubPosts }
      };
      const payload = { response: stubResponse };
      const action = { type: REDDIT_ACTIONS.RECEIVE_POSTS, payload };
      const newState = redditReducer(initialState, action);

      expect(newState.posts).to.deep.equal([].concat(initialPosts, stubPosts));
    });
  });
});
