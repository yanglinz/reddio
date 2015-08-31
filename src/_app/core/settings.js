import { includes } from 'lodash';

const env = localStorage.getItem('ENV');
const isLocalhost = document.location.hostname === 'localhost';
const isProd = !includes([
  'prod',
  'production',
  'stage',
  'staging'
], env);

const settings = {
  IS_DEV: env ? !isProd : isLocalhost,
  IS_PROD: env ? isProd : !isLocalhost
};

export default settings;
