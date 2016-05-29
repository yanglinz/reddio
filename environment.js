const assert = require('assert');

const _ = require('lodash');
const dotenv = require('dotenv');

dotenv.config({ silent: true });

const envDefaults = {
  NODE_ENV: 'development',
  HOSTNAME: 'localhost',
  PORT: '8000'
};

const environment = _.defaults({}, process.env, envDefaults);

const NODE_ENV = environment.NODE_ENV;
const CI = environment.CI;
const IS_PROD = NODE_ENV === 'production';
const HOSTNAME = environment.HOSTNAME;
const PORT = environment.PORT;

const SURGE_LOGIN = environment.SURGE_LOGIN;
const SURGE_TOKEN = environment.SURGE_TOKEN;
const SURGE_DOMAIN = environment.SURGE_DOMAIN;

if (CI) {
  assert(IS_PROD, 'In CI, NODE_ENV must be set to production');
}

module.exports = {
  NODE_ENV,
  CI,
  IS_PROD,
  HOSTNAME,
  PORT,
  SURGE_LOGIN,
  SURGE_TOKEN,
  SURGE_DOMAIN
};
