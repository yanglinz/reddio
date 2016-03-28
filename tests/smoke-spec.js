describe('smoke test', () => {
  it('should navigate to index page', () => {
    browser.get('/');
    const title = browser.getTitle();
    expect(title).toEqual('Reddio');
  });
});
