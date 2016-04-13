import { expect } from 'chai';

import store from '../state.js';

describe('state store', () => {
  it('should have redux store functions', () => {
    expect(store.dispatch).to.be.function;
  });
});
