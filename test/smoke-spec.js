describe('smoke spec', () => {
  it('should get index title', () => {
    browser.get('/');
    expect(browser.getTitle()).toEqual('Frontend Boilerplate');
  });
});
