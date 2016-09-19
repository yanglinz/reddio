const _ = require('lodash');
const dotenv = require('dotenv');
const git = require('git-rev-sync');

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
const IS_PROD = NODE_ENV === 'production';
const CI = env.CI;
const TRAVIS = env.TRAVIS;
const APPVEYOR = env.APPVEYOR;
const GIT_HASH_SHORT = git.short();
const HOSTNAME = env.HOSTNAME;
const PORT = env.PORT;
const FIREBASE_TOKEN = env.FIREBASE_TOKEN;
const SEGMENT_API_KEY = env.SEGMENT_API_KEY;
const SENTRY_DSN = env.SENTRY_DSN;

const CLIENT_ENV = {
  NODE_ENV,
  IS_PROD,
  GIT_HASH_SHORT,
  SEGMENT_API_KEY,
  SENTRY_DSN
};

module.exports = {
  WINDOWS,
  DARWIN,
  LINUX,
  NODE_ENV,
  IS_PROD,
  CI,
  TRAVIS,
  APPVEYOR,
  GIT_HASH_SHORT,
  HOSTNAME,
  PORT,
  FIREBASE_TOKEN,
  SEGMENT_API_KEY,
  SENTRY_DSN,
  CLIENT_ENV
};
