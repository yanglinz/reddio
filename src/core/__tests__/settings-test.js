import _ from 'lodash';
import { expect } from 'chai';

import settings from '../settings';

describe('settings test', () => {
  it('should have the expected environmental variables', () => {
    const expectedKeys = [
      'NODE_ENV',
      'GIT_HASH_SHORT'
    ];
    const keys = _.intersection(_.keys(settings), expectedKeys);
    expect(keys).to.deep.equal(expectedKeys);
  });
});
