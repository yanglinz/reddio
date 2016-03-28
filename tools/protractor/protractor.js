import * as config from '../../config.js';

/**
 * A base URL for your application under test
 */
const baseUrl = `http://${config.HOSTNAME}:${config.PORT}`;

/**
 * Test suite against a single browser
 */
const capabilities = {
  browserName: config.CI ? 'firefox' : 'chrome'
};

/**
 * Spec globs are relative to the root of the project
 */
const specs = ['tests/**/*-spec.js'];

/**
 * Write spec in jasmine flavor specs
 */
const framework = 'jasmine';
const jasmineNodeOpts = { defaultTimeoutInterval: 30000 };

/**
 * Don't wait for angular to load
 */
const onPrepare = () => {
  browser.ignoreSynchronization = true;
};

/**
 * Protractor config factory
 */
export function protractorConfig() {
  return {
    baseUrl,
    capabilities,
    specs,
    framework,
    jasmineNodeOpts,
    onPrepare
  };
}
