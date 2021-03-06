import _ from 'lodash';
import { expect } from 'chai';

import { EVENTS } from 'state/constants';
import { configureStore } from 'state/store';
import * as actions from 'state/reddit/actions';
import {
  selectBaseLink,
  selectHotLink,
  selectNewLink,
  selectRisingLink,
  selectControversialLink,
  redditReducer,
} from '../reducer';

describe('reddit reducer', () => {
  let initialState;
  let initialRedditState;

  beforeEach(() => {
    const store = configureStore();
    initialState = store.getState();
    initialRedditState = initialState.reddit;
  });

  describe('initial state', () => {
    it('should have the expected initial state', () => {
      expect(initialRedditState).to.deep.equal({
        pathname: null,
        query: null,
        sortType: null,
        sortRange: null,
        posts: [],
      });
    });
  });

  describe('link selectors', () => {
    it('should select base links', () => {
      const baseLinkByPathname = {
        '': null,
        '/r/subreddit': '/r/subreddit',
        '/r/subreddit/': '/r/subreddit',
        '/r/subreddit/new': '/r/subreddit',
        '/r/subreddit/rising': '/r/subreddit',
        '/r/subreddit/controversial': '/r/subreddit',
        '/r/subreddit/random': '/r/subreddit',
        '/r/subreddit/top': '/r/subreddit',
        '/user/username/m/multiname': '/user/username/m/multiname',
        '/user/username/m/multiname/': '/user/username/m/multiname',
        '/user/username/m/multiname/new': '/user/username/m/multiname',
      };

      _.each(baseLinkByPathname, (baseLink, pathname) => {
        const state = initialState;
        state.reddit.pathname = pathname;
        expect(selectBaseLink(state)).to.equal(baseLink);
      });
    });

    it('should select hot links', () => {
      const hotLinkByPathname = {
        '': null,
        '/r/subreddit': '/r/subreddit/hot',
        '/r/subreddit/new': '/r/subreddit/hot',
        '/r/subreddit/top': '/r/subreddit/hot',
        '/user/username/m/multiname': '/user/username/m/multiname/hot',
        '/user/username/m/multiname/new': '/user/username/m/multiname/hot',
      };

      _.each(hotLinkByPathname, (hotLink, pathname) => {
        const state = initialState;
        state.reddit.pathname = pathname;
        expect(selectHotLink(state)).to.equal(hotLink);
      });
    });

    it('should select new links', () => {
      const newLinkByPathname = {
        '': null,
        '/r/subreddit': '/r/subreddit/new',
        '/r/subreddit/new': '/r/subreddit/new',
        '/r/subreddit/top': '/r/subreddit/new',
        '/user/username/m/multiname': '/user/username/m/multiname/new',
        '/user/username/m/multiname/new': '/user/username/m/multiname/new',
      };

      _.each(newLinkByPathname, (newLink, pathname) => {
        const state = initialState;
        state.reddit.pathname = pathname;
        expect(selectNewLink(state)).to.equal(newLink);
      });
    });

    it('should select rising links', () => {
      const risingLinkByPathname = {
        '': null,
        '/r/subreddit': '/r/subreddit/rising',
        '/r/subreddit/new': '/r/subreddit/rising',
        '/r/subreddit/top': '/r/subreddit/rising',
        '/user/username/m/multiname': '/user/username/m/multiname/rising',
        '/user/username/m/multiname/new': '/user/username/m/multiname/rising',
      };

      _.each(risingLinkByPathname, (risingLink, pathname) => {
        const state = initialState;
        state.reddit.pathname = pathname;
        expect(selectRisingLink(state)).to.equal(risingLink);
      });
    });

    it('should select controversial links', () => {
      const controversialLinkByPathname = {
        '': null,
        '/r/subreddit': '/r/subreddit/controversial',
        '/r/subreddit/new': '/r/subreddit/controversial',
        '/r/subreddit/top': '/r/subreddit/controversial',
        '/user/username/m/multiname': '/user/username/m/multiname/controversial',
        '/user/username/m/multiname/new': '/user/username/m/multiname/controversial',
      };

      _.each(controversialLinkByPathname, (controversialLink, pathname) => {
        const state = initialState;
        state.reddit.pathname = pathname;
        expect(selectControversialLink(state)).to.equal(controversialLink);
      });
    });
  });

  describe('route change reducer', () => {
    it('should set new pathname and query', () => {
      const pathname = '/r/listentothis/hot';
      const query = null;
      const payload = { pathname, query };
      const action = { type: EVENTS.ROUTER_LOCATION_CHANGE, payload };
      const newState = redditReducer(initialRedditState, action);

      expect(newState).to.deep.equal(_.assign({}, initialRedditState, {
        pathname,
        query,
      }));
    });

    it('should invalidate posts if pathname has changed', () => {
      initialState.pathname = '/r/listentothis/hot';
      initialState.posts = [{ foo: 'bar' }];

      const pathname = '/r/music/hot';
      const query = null;
      const payload = { pathname, query };
      const action = { type: EVENTS.ROUTER_LOCATION_CHANGE, payload };
      const newState = redditReducer(initialRedditState, action);

      expect(newState).to.deep.equal(_.assign({}, initialRedditState, {
        pathname,
        query,
        posts: [],
      }));
    });

    it('should invalidate posts if query has changed', () => {
      initialState.pathname = '/r/listentothis/top';
      initialState.query = { sort: 'top', t: 'week' };
      initialState.posts = [{ foo: 'bar' }];

      const pathname = '/r/listentothis/top';
      const query = { sort: 'top', t: 'day' };
      const payload = { pathname, query };
      const action = { type: EVENTS.ROUTER_LOCATION_CHANGE, payload };
      const newState = redditReducer(initialRedditState, action);

      expect(newState).to.deep.equal(_.assign({}, initialRedditState, {
        pathname,
        query,
        posts: [],
      }));
    });

    it('should not invalidate posts if params did not change', () => {
      initialRedditState.pathname = '/r/listentothis/top';
      initialRedditState.query = { sort: 'top', t: 'day' };
      initialRedditState.posts = [{ foo: 'bar' }];

      const pathname = '/r/listentothis/top';
      const query = { sort: 'top', t: 'day' };
      const payload = { pathname, query };
      const action = { type: EVENTS.ROUTER_LOCATION_CHANGE, payload };
      const newState = redditReducer(initialRedditState, action);

      expect(newState).to.deep.equal(_.assign({}, initialRedditState));
    });
  });

  describe('receive posts reducer', () => {
    it('should receive posts on empty posts', () => {
      initialRedditState.posts = [];

      const stubResponse = [{ foo: 'bar' }];
      const pathname = '/r/listentothis/top';
      const query = { sort: 'top', t: 'day' };
      const action = actions.receivePosts(pathname, query, stubResponse);

      const newState = redditReducer(initialRedditState, action);
      expect(newState.posts).to.deep.equal(stubResponse);
    });

    it('should receive posts with existing posts', () => {
      const initialPosts = [{ bar: 'baz' }];
      initialRedditState.posts = initialPosts;

      const stubResponse = [{ foo: 'bar' }];
      const pathname = '/r/listentothis/top';
      const query = { sort: 'top', t: 'day' };
      const action = actions.receivePosts(pathname, query, stubResponse);
      const newState = redditReducer(initialRedditState, action);

      expect(newState.posts).to.deep.equal([].concat(initialPosts, stubResponse));
    });
  });
});
