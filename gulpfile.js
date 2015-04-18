'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');

// split gulp tasks across multiple files
requireDir('./gulp/tasks', {recurse: true});

gulp.task('dst', function (callback) {
  runSequence(
    'server:clean',
    'static:process',
    'templates:process',
    'vendor:copy',
    'assets:process',
    'fixtures:process',
    'webpack:build',
    callback
  )
});

gulp.task('build', function (callback) {
  runSequence(
    'dst',
    'build:build',
    callback
  )
});

gulp.task('deploy', function (callback) {
  runSequence(
    'deploy:publish',
    callback
  )
});

gulp.task('serve', function (callback) {
  runSequence(
    'dst',
    ['server:start', 'watch'],
    callback
  )
});
