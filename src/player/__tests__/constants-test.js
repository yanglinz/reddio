import _ from 'lodash';
import { expect } from 'chai';

import { PLAYER_STATES, PLAYER_ACTIONS } from 'player/constants';

describe('player constants', () => {
  it('should have valid player states', () => {
    _.each(PLAYER_STATES, (name, value) => expect(name).to.equal(value));
  });

  it('should have valid player actions', () => {
    _.each(PLAYER_ACTIONS, (name, value) => expect(name).to.equal(value));
  });
});
