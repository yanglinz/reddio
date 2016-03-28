require('babel-core/register');
module.exports = {
  config: require('./tools/protractor/protractor.js').protractorConfig()
};

