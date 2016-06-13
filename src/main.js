import 'babel-polyfill';
import 'analytics/segment.js';
import 'analytics/sentry.js';
import './core/entry.js';
import './core/styles/main.scss';

import * as player from 'player/controls.js';
window.player = player;

if (module.hot) {
  module.hot.accept();
}
