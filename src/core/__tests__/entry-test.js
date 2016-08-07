import { expect } from 'chai';

import { initialize } from '../entry';

describe('initialize app', () => {
  it('should initialize app', () => {
    document.body.innerHTML = '';
    const mountNode = document.createElement('div');
    mountNode.id = 'app';
    document.body.appendChild(mountNode);
    initialize(mountNode.id);
    expect(document.getElementsByClassName('root').length).to.equal(1);
  });
});
