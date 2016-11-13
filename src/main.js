import 'whatwg-fetch';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import 'services/analytics/segment';
import 'services/analytics/sentry';
import AppRoutes from './screens/routes';

export function initialize(mountId) {
  const mountNode = document.getElementById(mountId);
  ReactDOM.render(<AppRoutes />, mountNode);
}

const mountId = 'app';
initialize(mountId);

if (module.hot) {
  module.hot.accept();
}
