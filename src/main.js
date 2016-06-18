import 'analytics/segment.js';
import 'analytics/sentry.js';
import './core/styles/main.scss';
import { initialize } from './core/entry.js';

const mountId = 'app';
initialize(mountId);

if (module.hot) {
  module.hot.accept();
}
