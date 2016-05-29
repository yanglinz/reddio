import _ from 'lodash';
import { expect } from 'chai';

import settings from '../settings.js';

describe('environment settings', () => {
  it('should have expected settings', () => {
    expect(_.keys(settings)).to.deep.equal([
      'NODE_ENV'
    ]);
  });
});
