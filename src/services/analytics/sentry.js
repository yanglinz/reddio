import Raven from 'raven-js';

import settings from 'settings';

if (settings.IS_PROD) {
  Raven.config(settings.SENTRY_DSN).install();
}
