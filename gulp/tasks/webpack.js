var gulp = require('gulp');
var path = require('path');
var childProcess = require('child_process');

/**
 * Run webpack cli to process and watch assets
 */

var webpackBin = path.resolve(__dirname, './../../node_modules/webpack/bin/webpack.js');

var webpackCliOptions = {
  cwd: path.resolve(__dirname, './../..'),
  stdio: 'inherit'  // pipe stdout to console
};

gulp.task('webpack:build', function webpackBuild(callback) {
  var process = childProcess.spawn(webpackBin, [
    '--config', path.resolve(__dirname, './../../webpack.js')
  ], webpackCliOptions);
  process.on('close', callback);
});

gulp.task('webpack:watch', function webpackWatch() {
  childProcess.spawn(webpackBin, [
    '--config', path.resolve(__dirname, './../../webpack.js'),
    '--watch'
  ], webpackCliOptions);
});
