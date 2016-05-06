import Raven from 'raven-js';

import config from 'core/config.js';

if (config.IS_PROD) {
  Raven.config(config.SENTRY_DSN).install();
}
