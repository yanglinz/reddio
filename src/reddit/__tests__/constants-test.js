import _ from 'lodash';
import { expect } from 'chai';

import { REDDIT_ACTIONS, REDDIT_SORT_TYPES, REDDIT_SORT_RANGES } from '../constants.js';

describe('reddit constants', () => {
  it('should have valid reddit actions', () => {
    _.each(REDDIT_ACTIONS, (name, value) => expect(name).to.equal(value));
  });

  it('should have valid reddit actions', () => {
    _.each(REDDIT_SORT_TYPES, (name, value) => expect(name).to.equal(value));
  });

  it('should have valid reddit actions', () => {
    _.each(REDDIT_SORT_RANGES, (name, value) => expect(name).to.equal(value));
  });
});
