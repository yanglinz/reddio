import _ from 'lodash';
import { expect } from 'chai';

import config from '../config.js';

describe('config test', () => {
  it('should have the expected environmental variables', () => {
    expect(_.keys(config)).to.deep.equal([
      'NODE_ENV',
      'ENVIRONMENT',
      'IS_PROD',
      'SEGMENT_API_KEY'
    ]);
  });
});
