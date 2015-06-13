var gulp = require('gulp');
var dirs = require('../directories.js');

/**
 * Process static assets (favicon, robot.txt, etc)
 */

gulp.task('static:process', function processStaticTask() {
  return gulp.src(dirs.globs.msc.all, {base: dirs.paths.src})
    .pipe(gulp.dest(dirs.paths.dst));
});
