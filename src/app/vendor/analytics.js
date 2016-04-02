import analyticsLoader from 'analytics.js-loader';

import config from 'core/config.js';

const analytics = analyticsLoader({
  writeKey: config.SEGMENT_API_KEY
});

export function track(eventName, params = {}) {
  analytics.track(eventName, params);
}
