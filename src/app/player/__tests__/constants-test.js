import _ from 'lodash';
import { expect } from 'chai';

import * as constants from '../constants.js';

describe('player constants', () => {
  it('should have valid player states', () => {
    _.each(constants.PLAYER_STATES, (name, value) => expect(name).to.equal(value));
  });

  it('should have valid player actions', () => {
    _.each(constants.PLAYER_ACTIONS, (name, value) => expect(name).to.equal(value));
  });
});
