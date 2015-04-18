'use strict';

var gulp = require('gulp');
var path = require('path');
var child_process = require('child_process');


/*
 * Run webpack cli to process and watch assets
 *
 */

var webpackCliOptions = {
  cwd: path.resolve(__dirname, './../..'),
  stdio: 'inherit'  // pipe stdout to console
};

gulp.task('webpack:build', function (callback) {
  var process = child_process.spawn('webpack', [
    '--config', path.resolve(__dirname, './../../configs/webpack.js')
  ], webpackCliOptions);
  process.on('close', callback);
});

gulp.task('webpack:watch', function () {
  child_process.spawn('webpack', [
    '--config', path.resolve(__dirname, './../../configs/webpack.js'),
    '--watch'
  ], webpackCliOptions);
});
