require('babel-core/register');

const protractorConfigGenerator = require('./.config/protractor.js');

module.exports = {
  config: protractorConfigGenerator.protractorConfig()
};

