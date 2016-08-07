import { expect } from 'chai';

import * as api from '../api';

describe('reddit api wrappers', () => {
  describe('reddit api helpers', () => {
    it('should get listing url', () => {
      const url = api.listingUrl('www.reddit.com/r/subreddit/', 'hot');
      expect(url).to.equal('www.reddit.com/r/subreddit/hot.json');
    });

    it('should get listing params', () => {
      const params = api.listingParams({
        sortRange: 'day',
        before: 'T_foo',
        after: 'T_bar',
        count: 0,
        limit: 13
      });
      expect(params).to.deep.equal({
        t: 'day',
        before: 'T_foo',
        after: 'T_bar',
        count: 0,
        limit: 13
      });
    });

    it('should get listing params with defaults', () => {
      const params = api.listingParams({ sortRange: 'day' });
      expect(params).to.deep.equal({
        t: 'day',
        before: undefined,
        after: undefined,
        count: undefined,
        limit: 25
      });
    });
  });
});
