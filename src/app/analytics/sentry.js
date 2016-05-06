import Raven from 'raven-js';

import config from 'core/config.js';

Raven.config(config.SENTRY_DSN).install();
