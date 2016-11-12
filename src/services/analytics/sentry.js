import Raven from 'raven-js';

import settings from 'core/settings';

if (settings.IS_PROD) {
  Raven.config(settings.SENTRY_DSN).install();
}
