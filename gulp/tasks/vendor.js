var gulp = require('gulp');
var path = require('path');
var modernizr = require('gulp-modernizr');
var uglify = require('gulp-uglify');
var dirs = require('../directories.js');

/**
 * Process vendor files
 */

var vendorGlobs = [
  'node_modules/jquery/dist/**'
];
var vendorDir = path.join(dirs.paths.dst, '_vendor');

gulp.task('vendor:copy', function copyVendor() {
  return gulp.src(vendorGlobs, {base: 'node_modules'})
    .pipe(gulp.dest(vendorDir));
});

/**
 * Build custom modernizr
 */

gulp.task('custom:modernizr', function buildModernizr() {
  return gulp.src('node_modules/modernizr/src/*.js', {base: 'node_modules'})
    .pipe(modernizr({
      options: ['mq']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(vendorDir));
});

gulp.task('vendor:process', [
  'vendor:copy',
  'custom:modernizr'
]);
