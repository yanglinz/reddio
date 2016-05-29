import analyticsLoader from 'analytics.js-loader';

import settings from 'core/settings.js';

const analytics = analyticsLoader({
  writeKey: settings.SEGMENT_API_KEY
});

export function track(eventName, params = {}) {
  analytics.track(eventName, params);
}
