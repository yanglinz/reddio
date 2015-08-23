var path = require('path');
var gulp = require('gulp');
var utilities = require('./utilities.js');

gulp.task('development:server', function(callback) {
  var devServerCli = path.resolve(__dirname, '../../node_modules/.bin/webpack-dev-server');
  utilities.spawnChildProcess(devServerCli, {callback: callback});
});
