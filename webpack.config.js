var _ = require('lodash');
var environment = require('./build/environment.js');

var baseConfig = require('./build/webpack/base.config.js');
var prodConfig = require('./build/webpack/prod.config.js');
var devServerConfig = require('./build/webpack/devserver.config.js');

/**
 * Create the webpack config for local development.
 * This config inherits from both the base configuration
 * as well as the development server configuration.
 */

var webpackConfig = _.extend({}, baseConfig, devServerConfig);

/**
 * Extend the webpack config if the environment is in production.
 * This config inherits from base configuration, development server configuration
 * as well as some production specific configuration.
 */

var isProd = [
  environment.ENV === 'prod',
  environment.ENV === 'production',
  environment.ENV === 'stage',
  environment.ENV === 'staging',
  environment.CI,
  environment.TRAVIS
];
if (_.any(isProd)) {
  webpackConfig = _.extend({}, webpackConfig, prodConfig);
}

module.exports = webpackConfig;
