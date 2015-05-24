'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var rimraf = require('rimraf');
var dirs = require('../directories.js');

/**
 * Run development server
 */

gulp.task('server:clean', function(callback) {
  rimraf(dirs.paths.dst, callback);
});

gulp.task('server:start', function() {
  return gulp.src(dirs.paths.dst)
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});
