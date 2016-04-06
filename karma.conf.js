require('babel-register');

function karmaConfig(config) {
  config.set(require('./.config/karma.js').karmaConfig());
}

module.exports = karmaConfig;
