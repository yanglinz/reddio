'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var dirs = require('../directories.js');


/*
 * Process JSON
 *
 */

gulp.task('fixtures:processJson', function () {
  return gulp.src(dirs.globs.fixtures.json, {base: dirs.paths.src})
    .pipe(gulp.dest(dirs.paths.dst));
});


/*
 * Process all other miscellaneous fixtures
 *
 */

gulp.task('fixtures:processMiscellaneous', function () {
  return gulp.src(dirs.globs.fixtures.misc, {base: dirs.paths.src})
    .pipe(gulp.dest(dirs.paths.dst));
});


/*
 * Expose public gulp tasks
 *
 */

gulp.task('fixtures:process', function (callback) {
  runSequence(
    'fixtures:processJson',
    'fixtures:processMiscellaneous',
    callback
  )
});
