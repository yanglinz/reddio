import { any, isEmpty } from 'lodash';
import dotenv from 'dotenv';

dotenv.load();  // source environmental variables from .env

const {
  ENVIRONMENT,
  SURGE_DOMAIN,
  SURGE_TOKEN,
  CI
} = process.env;
const IS_CI = CI === 'true';
const DOMAIN = process.env.DOMAIN || 'http://localhost:8000';
const IS_PROD = any([
  ENVIRONMENT === 'stage',
  ENVIRONMENT === 'staging',
  ENVIRONMENT === 'prod',
  ENVIRONMENT === 'production',
  IS_CI
]);
const USE_IP = !isEmpty(process.env.USE_IP);

const settings = {
  ENVIRONMENT,
  IS_PROD,
  IS_LOCAL: !IS_PROD,
  IS_CI,
  DOMAIN,
  SURGE_DOMAIN,
  SURGE_TOKEN,
  USE_IP
};

export default settings;
