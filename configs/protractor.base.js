'use strict';

var path = require('path');
var root = path.resolve(__dirname, './..');

module.exports = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [path.resolve(root, './tests/e2e/**/*-spec.js')]
};
