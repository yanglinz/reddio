require('babel-register');

const karmaConfigGenerator = require('./.config/karma.js');

function karmaConfig(config) {
  config.set(karmaConfigGenerator.karmaConfig());
}

module.exports = karmaConfig;
