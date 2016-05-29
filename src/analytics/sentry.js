import Raven from 'raven-js';

import settings from 'core/settings.js';

if (settings.IS_PROD) {
  Raven.settings(settings.SENTRY_DSN).install();
}
