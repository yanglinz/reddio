describe('basic sanity checks', () => {
  it('should load google properly', () => {
    browser.get('https://google.com');
    expect(browser.getTitle()).toEqual('Google');
  });

  it('should load yahoo properly', () => {
    browser.get('https://yahoo.com');
    expect(browser.getTitle()).toEqual('Yahoo');
  });
});
