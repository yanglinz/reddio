import { expect } from 'chai';

import store from '../store';

describe('state store', () => {
  it('should have redux store functions', () => {
    expect(store.dispatch).to.be.a('function');
    expect(store.subscribe).to.be.a('function');
    expect(store.replaceReducer).to.be.a('function');
  });

  it('should get current state', () => {
    expect(store.getState()).to.be.an('object');
  });
});
