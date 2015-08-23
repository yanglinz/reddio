var _ = require('lodash');
var dotenv = require('dotenv');

dotenv.load();  // source environmental variables from .env

var ENVIRONMENT = process.env.ENVIRONMENT;
var IS_PROD = _.any([
  ENVIRONMENT === 'stage',
  ENVIRONMENT === 'staging',
  ENVIRONMENT === 'prod',
  ENVIRONMENT === 'production'
]);

module.exports = {
  ENVIRONMENT: ENVIRONMENT,
  IS_PROD: IS_PROD,
  IS_LOCAL: !IS_PROD
};
