/* eslint no-var: 0, vars-on-top: 0, func-names: 0 */

require('babel/register');  // write specs in ES6
var path = require('path');

var protractorConfig = {
  specs: [
    path.resolve(__dirname, '**/*.spec.js')
  ],

  onPrepare: function() {
    browser.ignoreSynchronization = true;  // don't wait for angular.js to load
  }
};

module.exports = {
  config: protractorConfig
};
