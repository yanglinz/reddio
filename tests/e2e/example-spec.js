'use strict';

describe('sample test', function() {
  beforeEach(function() {
    return browser.ignoreSynchronization = true;  // non-angular site
  });

  it('should pass', function() {
    browser.get('http://www.google.com');
    expect(browser.getTitle()).toContain('Google');
  });
});
