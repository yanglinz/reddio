import { expect } from 'chai';

import { routePathParams } from '../routes';

describe('routes test', () => {
  describe('route pattern matching', () => {
    it('should match basic reddit route pathname', () => {
      const pathname = '/r/listentothis/hot';
      const pathParams = routePathParams(pathname);
      expect(pathParams).to.deep.equal({
        subreddit: 'listentothis',
        sortType: 'hot'
      });
    });

    it('should match basic reddit route pathname with sortRange', () => {
      const pathname = '/r/listentothis/top/week';
      const pathParams = routePathParams(pathname);
      expect(pathParams).to.deep.equal({
        subreddit: 'listentothis',
        sortType: 'top',
        sortRange: 'week'
      });
    });

    it('should return null if a match is not found', () => {
      const pathname = '/r/foobar';
      const pathParams = routePathParams(pathname);
      expect(pathParams).to.equal(null);
    });
  });
});
