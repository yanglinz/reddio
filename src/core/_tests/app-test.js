import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import App from '../app.js';

describe('App component test suite', () => {
  let appElement;

  beforeEach(() => {
    appElement = ReactTestUtils.renderIntoDocument(<App />);
  });

  it('should render the app component', () => {
    ReactTestUtils.findRenderedDOMComponentWithClass(appElement, 'app');
  });
});
