import { expect } from 'chai';

import * as utilities from '../index';

describe('utility functions', () => {
  it('should parse urls', () => {
    const url = 'http://example.com:3000/pathname/?search=test#hash';
    const urlComponents = utilities.parseUrl(url);
    expect(urlComponents.protocol).to.equal('http:');
    expect(urlComponents.hostname).to.equal('example.com');
    expect(urlComponents.pathname).to.equal('/pathname/');
    expect(urlComponents.search).to.equal('?search=test');
    expect(urlComponents.hash).to.equal('#hash');
    expect(urlComponents.host).to.equal('example.com:3000');
  });
});
