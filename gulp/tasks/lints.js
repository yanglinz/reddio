'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var scsslint = require('gulp-scss-lint');
var path = require('path');
var runSequence = require('run-sequence');
var dirs = require('../directories.js');


/*
 * Lint javascript
 *
 */

gulp.task('lints:js', function () {
  return gulp.src([].concat(dirs.globs.app).concat(dirs.globs.assets.js))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
});


/*
 * Lint scss
 *
 */

gulp.task('lints:scss', function () {
  return gulp.src(dirs.globs.assets.css)
    .pipe(scsslint({
      config: path.resolve(__dirname, '../../.scss-lint.yml')
    }));
});


/*
 * Expose public gulp tasks
 *
 */

gulp.task('lints:run', function (callback) {
  runSequence(
    'lints:js',
    'lints:scss',
    callback
  )
});
