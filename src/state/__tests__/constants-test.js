import _ from 'lodash';
import { expect } from 'chai';

import { EVENTS, PLAYER_STATES } from '../constants';

describe('state constants', () => {
  describe('events', () => {
    it('should have the same key and value', () => {
      _.each(EVENTS, (v, k) => expect(k).to.equal(v));
    });

    it('should have unique keys', () => {
      expect(_.keys(EVENTS)).to.deep.equal(_.uniq(_.keys(EVENTS)));
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
