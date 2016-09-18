const env = require('./environment');

const framework = 'jasmine';
const capabilities = {
  browserName: env.CI ? 'firefox' : 'chrome'
};

const baseUrl = `http://${env.HOSTNAME}:${env.PORT}`;
const specs = ['test/**-spec.js'];

// https://github.com/angular/protractor/issues/2728
const localSeleniumStandaloneOpts = env.WINDOWS
  ? { args: ['-Djna.nosys=true'] }
  : {};

function onPrepare() {
  browser.ignoreSynchronization = true;
}

const protractorConfig = {
  framework,
  capabilities,
  baseUrl,
  specs,
  localSeleniumStandaloneOpts,
  onPrepare
};

exports.config = protractorConfig;
