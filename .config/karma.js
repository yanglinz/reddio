import { webpackConfig } from './webpack.js';

/**
 * Test files to run tests against
 */
const UNIT_TESTS = 'src/**/__tests__/*-test.js';
const INTEGRATION_TESTS = 'src/**/tests/*-test.js';
const FILES = [UNIT_TESTS, INTEGRATION_TESTS];

/**
 * Preprocessors
 */
const PREPROCESSORS = {
  [UNIT_TESTS]: ['webpack'],
  [INTEGRATION_TESTS]: ['webpack']
};

/**
 * Frameworks
 */
const FRAMEWORKS = ['mocha'];

/**
 * Browsers
 */
const BROWSERS = ['Chrome'];

/**
 * Reporters
 */
const REPORTERS = ['mocha'];

/**
 * Custom webpack middleware
 */
const WEBPACK = webpackConfig();
const WEBPACK_MIDDLEWARE = {
  noInfo: true
};

export function karmaConfig() {
  return {
    files: FILES,
    preprocessors: PREPROCESSORS,
    frameworks: FRAMEWORKS,
    browsers: BROWSERS,
    reporters: REPORTERS,
    webpack: WEBPACK,
    webpackMiddleware: WEBPACK_MIDDLEWARE
  };
}
