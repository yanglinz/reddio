import _ from 'lodash';
import { expect } from 'chai';
import { put } from 'redux-saga/effects';

import { REDDIT_ACTIONS } from '../constants';
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
});
