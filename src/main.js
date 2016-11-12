import 'whatwg-fetch';
import 'babel-polyfill';
import 'services/analytics/segment';
import 'services/analytics/sentry';
import './core/styles/main.scss';
import { initialize } from './core/entry';

const mountId = 'app';
initialize(mountId);

if (module.hot) {
  module.hot.accept();
}
