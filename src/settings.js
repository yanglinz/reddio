/* global __WEBPACK_DEFINE__ */

import _ from 'lodash';

const settings = __WEBPACK_DEFINE__;

const REDDIT_URL = settings.IS_PROD
  ? 'https://www.reddit.com'
  : 'http://www.reddit.com';

export default _.assign(settings, {
  REDDIT_URL,
});
