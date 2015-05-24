'use strict';

var gulp = require('gulp');
var dirs = require('../directories.js');

/**
 * Process vendor (bower managed) files
 */

gulp.task('vendor:copy', function() {
  return gulp.src(dirs.globs.vendor, {base: dirs.paths.src})
    .pipe(gulp.dest(dirs.paths.dst));
});
