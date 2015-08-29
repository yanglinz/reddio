import { any } from 'lodash';
import dotenv from 'dotenv';

dotenv.load();  // source environmental variables from .env

const ENVIRONMENT = process.env.ENVIRONMENT;
const IS_PROD = any([
  ENVIRONMENT === 'stage',
  ENVIRONMENT === 'staging',
  ENVIRONMENT === 'prod',
  ENVIRONMENT === 'production'
]);

const settings = {
  ENVIRONMENT: ENVIRONMENT,
  IS_PROD: IS_PROD,
  IS_LOCAL: !IS_PROD,
  IS_TRAVIS: process.env.TRAVIS,
  SURGE_DOMAIN: process.env.SURGE_DOMAIN,
  SURGE_TOKEN: process.env.SURGE_TOKEN
};

export default settings;
