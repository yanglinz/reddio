import assert from 'assert';

import _ from 'lodash';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

const environment = _.defaults({}, process.env, {
  NODE_ENV: 'development',
  HOSTNAME: 'localhost',
  PORT: '5000'
});

export const NODE_ENV = environment.NODE_ENV;
export const ENVIRONMENT = NODE_ENV;
export const CI = environment.CI;
export const IS_PROD = ENVIRONMENT === 'production';
export const HOSTNAME = environment.HOSTNAME;
export const PORT = environment.PORT;
export const SURGE_LOGIN = environment.SURGE_LOGIN;
export const SURGE_TOKEN = environment.SURGE_TOKEN;
export const SURGE_DOMAIN = environment.SURGE_DOMAIN;

if (CI) {
  assert(IS_PROD, 'In CI, ENVIRONMENT must be set to production');
}
