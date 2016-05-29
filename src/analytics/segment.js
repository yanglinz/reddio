import _ from 'lodash';
import analyticsLoader from 'analytics.js-loader';

import settings from 'core/settings.js';

const analyticsShim = {
  track: _.noop
};

const analytics = settings.IS_PROD
  ? analyticsLoader({ writeKey: settings.SEGMENT_API_KEY })
  : analyticsShim;

export function track(eventName, params = {}) {
  analytics.track(eventName, params);
}
