import './core/entry.js';
import './core/styles/main.scss';

import 'analytics/segment.js';
import 'analytics/sentry.js';
import './core/app.js';

if (module.hot) {
  module.hot.accept();
}
