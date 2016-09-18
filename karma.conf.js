const { webpackTestConfig } = require('./tools/webpack/webpack');
const env = require('./environment');

function karmaConfig(config) {
  const unitTestFiles = 'src/**/__tests__/*-test.js';
  const files = [unitTestFiles];
  const preprocessors = {
    [unitTestFiles]: ['webpack']
  };

  const browsers = env.CI ? ['Firefox'] : ['Chrome'];
  const frameworks = ['mocha'];
  const reporters = ['mocha'];
  const autoWatch = true;

  const webpack = webpackTestConfig();
  const webpackMiddleware = { noInfo: true };

  config.set({
    files,
    preprocessors,
    browsers,
    frameworks,
    reporters,
    autoWatch,
    webpack,
    webpackMiddleware
  });
}

module.exports = karmaConfig;
