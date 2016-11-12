import _ from 'lodash';
import { expect } from 'chai';

import { EVENTS, PLAYER_STATES } from '../constants';

describe('state constants', () => {
  describe('events', () => {
    const whitelist = ['ROUTER_LOCATION_CHANGE'];
    const events = _.omit(EVENTS, whitelist);

    it('should have the same key and value', () => {
      _.each(events, (v, k) => expect(k).to.equal(v));
    });

    it('should have unique keys', () => {
      expect(_.keys(events)).to.deep.equal(_.uniq(_.keys(events)));
    });
  });

  describe('player states', () => {
    it('should have the same key and value', () => {
      _.each(PLAYER_STATES, (v, k) => expect(k).to.equal(v));
    });

    it('should have unique keys', () => {
      expect(_.keys(PLAYER_STATES)).to.deep.equal(_.uniq(_.keys(PLAYER_STATES)));
    });
  });
});
