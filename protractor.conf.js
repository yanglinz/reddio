require('babel-core/register');
module.exports = {
  config: require('./.config/protractor.js').protractorConfig()
};

