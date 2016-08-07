const env = require('./environment');

const framework = 'jasmine';
const capabilities = {
  browserName: env.CI ? 'firefox' : 'chrome'
};

const baseUrl = `http://${env.HOSTNAME}:${env.PORT}`;
const specs = ['test/**-spec.js'];

function onPrepare() {
  browser.ignoreSynchronization = true;
}

const protractorConfig = { framework, capabilities, baseUrl, specs, onPrepare };

exports.config = protractorConfig;
