describe('basic sanity checks', () => {
  it('should load reddio properly', () => {
    browser.get('/');
    expect(browser.getTitle()).toEqual('Reddio');
  });
});
