import _ from 'lodash';
import { expect } from 'chai';

import { EVENTS } from '../constants';

describe('state constants', () => {
  it('should have the same key and value', () => {
    _.each(EVENTS, (v, k) => expect(k).to.equal(v));
  });

  it('should have unique keys', () => {
    expect(_.keys(EVENTS)).to.deep.equal(_.uniq(_.keys(EVENTS)));
  });
});
