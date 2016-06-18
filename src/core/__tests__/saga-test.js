import { expect } from 'chai';
import { put } from 'redux-saga/effects';

import { CORE_EVENTS } from '../constants.js';
import * as saga from '../saga.js';

describe('core sagas', () => {
  it('should yield saga initialization', () => {
    const generator = saga.initializeSaga();
    const initializedEvent = { type: CORE_EVENTS.SAGA_INITIALIZED };
    expect(generator.next().value).to.deep.equal(put(initializedEvent));
    expect(generator.next().done).to.equal(true);
  });
});
