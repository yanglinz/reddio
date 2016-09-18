import _ from 'lodash';
import { expect } from 'chai';
import { call, put } from 'redux-saga/effects';

import { SUBREDDITS, REDDIT_ACTIONS } from '../constants';
import * as api from '../api';
import * as saga from '../saga';

describe('reddit sagas', () => {
  describe('requesting posts', () => {
    const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

    it('should request posts', () => {
      const pathname = '/r/listentothis/hot';
      const payload = { pathname };
      const action = { type: ROUTER_LOCATION_CHANGE, payload };
      const generator = saga.requestPosts(action);

      const dispatchPayload = {
        subreddit: 'listentothis',
        sortType: 'hot',
        sortRange: undefined
      };
      const expectedDispatch = put({
        type: REDDIT_ACTIONS.REQUEST_POSTS,
        payload: dispatchPayload
      });
      expect(generator.next().value).to.deep.equal(expectedDispatch);
      expect(generator.next().done).to.equal(true);
    });

    it('should not request posts if pathname is not valid', () => {
      const invalidPathnames = [
        '/r',
        '/r/listentothis'
      ];
      _.each(invalidPathnames, (pathname) => {
        const payload = { pathname };
        const action = { type: ROUTER_LOCATION_CHANGE, payload };
        const generator = saga.requestPosts(action);
        expect(generator.next().done).to.equal(true);
      });
    });
  });

  describe('fetching posts', () => {
    it('should fetch posts', () => {
      const subreddit = 'listentothis';
      const sortType = 'hot';
      const payload = { subreddit, sortType };
      const action = { type: REDDIT_ACTIONS.RECEIVE_POSTS, payload };
      const generator = saga.fetchPosts(action);

      const baseUrl = SUBREDDITS[subreddit].url;
      const apiCall = call(api.getListing, baseUrl, 'hot', { sortRange: undefined });
      expect(generator.next().value).to.deep.equal(apiCall);

      const stubResponse = {};
      const dispatchPayload = { response: stubResponse };
      const expectedDispatch = put(
        { type: REDDIT_ACTIONS.RECEIVE_POSTS, payload: dispatchPayload });
      expect(generator.next(stubResponse).value).to.deep.equal(expectedDispatch);

      expect(generator.next().done).to.equal(true);
    });
  });
});
