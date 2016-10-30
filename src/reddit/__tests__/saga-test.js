import { expect } from 'chai';
import { call, put } from 'redux-saga/effects';

import { REDDIT_ACTIONS } from '../constants';
import * as api from '../api';
import * as saga from '../saga';

describe('reddit sagas', () => {
  describe('requesting posts', () => {
    const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

    it('should request posts', () => {
      const pathname = '/r/listentothis/top';
      const query = { sort: 'top', t: 'day' };
      const payload = { pathname, query };
      const action = { type: ROUTER_LOCATION_CHANGE, payload };
      const generator = saga.requestPosts(action);

      const dispatchPayload = { pathname, query };
      const expectedDispatch = put({
        type: REDDIT_ACTIONS.REQUEST_POSTS,
        payload: dispatchPayload,
      });
      expect(generator.next().value).to.deep.equal(expectedDispatch);
      expect(generator.next().done).to.equal(true);
    });
  });

  describe('fetching posts', () => {
    it('should fetch posts', () => {
      // generator setup
      const pathname = '/r/listentothis/top';
      const query = { sort: 'top', t: 'day' };
      const payload = { pathname, query };
      const action = { type: REDDIT_ACTIONS.REQUEST_POSTS, payload };
      const generator = saga.fetchPosts(action);

      // call api
      const apiCall = call(api.getListing, pathname, query);
      expect(generator.next().value).to.deep.equal(apiCall);

      // dispatch receive posts
      const stubResponse = {};
      const dispatchPayload = { pathname, query, response: stubResponse };
      const expectedDispatch = put(
        { type: REDDIT_ACTIONS.RECEIVE_POSTS, payload: dispatchPayload });
      expect(generator.next(stubResponse).value).to.deep.equal(expectedDispatch);

      expect(generator.next().done).to.equal(true);
    });

    it('should handle fetch posts error', () => {
      // generator setup
      const pathname = '/r/listentothis/top';
      const query = { sort: 'top', t: 'day' };
      const payload = { pathname, query };
      const action = { type: REDDIT_ACTIONS.REQUEST_POSTS, payload };
      const generator = saga.fetchPosts(action);

      // call api
      const apiCall = call(api.getListing, pathname, query);
      expect(generator.next().value).to.deep.equal(apiCall);

      // dispatch receive posts
      const stubResponse = new Error('Reddit API Error');
      const dispatchPayload = { pathname, query };
      const expectedDispatch = put(
        { type: REDDIT_ACTIONS.FETCH_POSTS_ERROR, payload: dispatchPayload });
      expect(generator.throw(stubResponse).value).to.deep.equal(expectedDispatch);

      expect(generator.next().done).to.equal(true);
    });
  });
});
