'use strict';

var path = require('path');

module.exports = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [path.resolve(__dirname, './tests/e2e/**/*-spec.js')]
};
