const _ = require('lodash');
const dotenv = require('dotenv');

dotenv.config({ silent: true });

const envDefaults = {
  NODE_ENV: 'development',
  HOSTNAME: 'localhost',
  PORT: '8000'
};

const env = _.defaults({}, process.env, envDefaults);

const IS_HOST_WINDOWS = process.platform === 'win32';
const IS_HOST_DARWIN = process.platform === 'darwin';
const IS_HOST_LINUX = process.platform === 'linux';

const NODE_ENV = env.NODE_ENV;
const CI = env.CI;
const IS_PROD = NODE_ENV === 'production';

const HOSTNAME = env.HOSTNAME;
const PORT = env.PORT;
const FIREBASE_TOKEN = env.FIREBASE_TOKEN;
const SEGMENT_API_KEY = env.SEGMENT_API_KEY;
const SENTRY_DSN = env.SENTRY_DSN;

module.exports = {
  IS_HOST_WINDOWS,
  IS_HOST_DARWIN,
  IS_HOST_LINUX,
  NODE_ENV,
  CI,
  IS_PROD,
  HOSTNAME,
  PORT,
  FIREBASE_TOKEN,
  SEGMENT_API_KEY,
  SENTRY_DSN
};
