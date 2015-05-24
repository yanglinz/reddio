'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var scsslint = require('gulp-scss-lint');
var path = require('path');
var dirs = require('../directories.js');

/**
 * Lint javascript
 */

gulp.task('lints:jshint', function() {
  return gulp.src(dirs.globs.assets.js)
    .pipe(jshint({
      lookup: true  // look up .jshintrc
    }))
    .pipe(jshint.reporter('jshint-stylish'));
});

/**
 * Lint javscript code styles
 */

gulp.task('lints:jscs', function() {
  return gulp.src(dirs.globs.assets.js)
    .pipe(jscs());
});

/**
 * Lint scss
 */

gulp.task('lints:scss', function() {
  return gulp.src(dirs.globs.assets.css)
    .pipe(scsslint({
      config: path.resolve(__dirname, '../../.scss-lint.yml')
    }));
});
