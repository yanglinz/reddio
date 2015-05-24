'use strict';

var gulp = require('gulp');
var dirs = require('../directories.js');

/**
 * Process static assets (favicon, robot.txt, etc)
 */

gulp.task('static:process', function() {
  return gulp.src(dirs.globs.static.all, {base: dirs.paths.src})
    .pipe(gulp.dest(dirs.paths.dst));
});
