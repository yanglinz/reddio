import React from 'react';
import ReactDOM from 'react-dom';

import App from './core/app.js';
import { IS_LOCAL } from './config.js';

require('./main.scss');

const mountNode = document.getElementById('app-mount');
ReactDOM.render(<App />, mountNode);

if (IS_LOCAL && module.hot) {
  module.hot.accept();
}
