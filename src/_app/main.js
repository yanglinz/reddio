import React from 'react';
import Root from './core/components/root-container.jsx';
import { history } from 'react-router/lib/HashHistory';

React.render(
  <Root history={history} />,
  document.getElementById('app-mount')
);
