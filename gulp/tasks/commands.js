var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var dirs = require('../directories.js');

/**
 * Run image optimization on src images
 */

gulp.task('commands:optimizeImages', function optimizeImagesTask() {
  return gulp.src(dirs.globs.assets.img, {base: dirs.paths.src})
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 7,
      multipass: true
    }))
    .pipe(gulp.dest(dirs.paths.src));
});
