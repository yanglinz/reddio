import Raven from 'raven-js';

import settings from 'core/settings.js';

if (settings.IS_PROD) {
  Raven.config(settings.SENTRY_DSN).install();
}
