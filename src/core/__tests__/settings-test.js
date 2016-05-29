import _ from 'lodash';
import { expect } from 'chai';

import settings from '../settings.js';

describe('settings test', () => {
  it('should have the expected environmental variables', () => {
    expect(_.keys(settings)).to.deep.equal([
      'NODE_ENV',
      'IS_PROD',
      'SEGMENT_API_KEY',
      'SENTRY_DSN'
    ]);
  });
});
