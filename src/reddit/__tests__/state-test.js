import _ from 'lodash';
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
        pathname: null,
        query: null,
        sortType: null,
        sortRange: null,
        posts: []
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
