import _ from 'lodash';
import { expect } from 'chai';

import settings from '../settings';

describe('settings test', () => {
  it('should have the expected environmental variables', () => {
    expect(_.keys(settings)).to.deep.equal([
      'NODE_ENV',
      'IS_PROD',
      'GIT_HASH_SHORT',
      'SEGMENT_API_KEY',
      'SENTRY_DSN',
      'REDDIT_URL'
    ]);
  });
});
