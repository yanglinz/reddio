const _ = require('lodash');
const dotenv = require('dotenv');

dotenv.config({ silent: true });

const envDefaults = {
  NODE_ENV: 'development',
  HOSTNAME: 'localhost',
  PORT: '8000'
};

const env = _.defaults({}, process.env, envDefaults);

const WINDOWS = process.platform === 'win32';
const DARWIN = process.platform === 'darwin';
const LINUX = process.platform === 'linux';

const NODE_ENV = env.NODE_ENV;
const CI = env.CI;
const TRAVIS = env.TRAVIS;
const APPVEYOR = env.APPVEYOR;
const IS_PROD = NODE_ENV === 'production';

const HOSTNAME = env.HOSTNAME;
const PORT = env.PORT;
const FIREBASE_TOKEN = env.FIREBASE_TOKEN;
const SEGMENT_API_KEY = env.SEGMENT_API_KEY;
const SENTRY_DSN = env.SENTRY_DSN;

const CLIENT_ENV = {
  NODE_ENV,
  IS_PROD,
  SEGMENT_API_KEY,
  SENTRY_DSN
};

module.exports = {
  WINDOWS,
  DARWIN,
  LINUX,
  NODE_ENV,
  CI,
  TRAVIS,
  APPVEYOR,
  IS_PROD,
  HOSTNAME,
  PORT,
  FIREBASE_TOKEN,
  SEGMENT_API_KEY,
  SENTRY_DSN,
  CLIENT_ENV
};
