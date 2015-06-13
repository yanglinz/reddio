/* global browser */

describe('sample test', function sampleSpec() {
  beforeEach(function beforeEach() {
    browser.ignoreSynchronization = true;  // non-angular site
    return null;
  });

  it('should pass', function dummyTest() {
    browser.get('http://www.google.com');
    expect(browser.getTitle()).toContain('Google');
  });
});
