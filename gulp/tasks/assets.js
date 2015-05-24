'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');
var lazypipe = require('lazypipe');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var errorHandler = require('../utilities/error.js');
var dirs = require('../directories.js');
var env = require('../../env.js');

/**
 * Process css
 */

var isLocal = env.ENV !== 'production' && env.ENV !== 'staging';

var processCss = lazypipe()
  .pipe(sass)
  .pipe(autoprefixer, {
    browsers: ['> 1%', 'last 2 versions', 'ie 8', 'ie 9'],
    cascade: false,
    remove: false
  });

var processProductionCss = lazypipe()
  .pipe(sourcemaps.init)
    .pipe(processCss)
    .pipe(minifyCSS)
  .pipe(sourcemaps.write);

gulp.task('assets:processCss', function() {
  return gulp.src(dirs.globs.assets.css, {base: dirs.paths.src})
    .pipe(gulpif(isLocal, plumber({errorHandler: errorHandler})))
    .pipe(gulpif(!isLocal, processProductionCss(), processCss()))
    .pipe(gulp.dest(dirs.paths.dst));
});

/**
 * Process images
 */

var optimizeImages = !isLocal && env.OPTIMIZE_IMAGES;

var processProductionImg = lazypipe()
  .pipe(imagemin, {
    progressive: true,
    optimizationLevel: 7,
    multipass: true
  });

gulp.task('assets:processImg', function() {
  return gulp.src(dirs.globs.assets.img, {base: dirs.paths.src})
    .pipe(gulpif(optimizeImages, processProductionImg()))
    .pipe(gulp.dest(dirs.paths.dst));
});

/**
 * Process fonts
 */

gulp.task('assets:processFonts', function() {
  return gulp.src(dirs.globs.assets.fonts, {base: dirs.paths.src})
    .pipe(gulp.dest(dirs.paths.dst));
});

/**
 * Expose public gulp tasks
 */

gulp.task('assets:process', function(callback) {
  runSequence(
    'assets:processCss',
    'assets:processImg',
    'assets:processFonts',
    callback
  );
});
