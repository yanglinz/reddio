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
  IS_LOCAL: !IS_PROD
};

export default settings;
