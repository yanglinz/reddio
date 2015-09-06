import { any, isEmpty } from 'lodash';
import dotenv from 'dotenv';

dotenv.load();  // source environmental variables from .env

const ENVIRONMENT = process.env.ENVIRONMENT;
const IS_PROD = any([
  ENVIRONMENT === 'stage',
  ENVIRONMENT === 'staging',
  ENVIRONMENT === 'prod',
  ENVIRONMENT === 'production'
]);

const USE_IP = !isEmpty(process.env.USE_IP);

const settings = {
  ENVIRONMENT: ENVIRONMENT,
  IS_PROD: IS_PROD,
  IS_LOCAL: !IS_PROD,
  USE_IP: USE_IP
};

export default settings;
