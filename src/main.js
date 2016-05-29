import 'babel-polyfill';
import 'analytics/segment.js';
import 'analytics/sentry.js';
import './core/entry.js';
import './core/styles/main.scss';

if (module.hot) {
  module.hot.accept();
}
