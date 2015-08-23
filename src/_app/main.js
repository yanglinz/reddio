import React from 'react';
import RootHandler from 'core/components/root-handler.jsx';
import { history } from 'react-router/lib/HashHistory';

React.render(
  <RootHandler history={history} />,
  document.getElementById('app-mount')
);
