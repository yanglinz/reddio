'use strict';

var gulp = require('gulp');
var swig = require('gulp-swig');
var handlebars = require('gulp-compile-handlebars');
var data = require('gulp-data');
var minifyHTML = require('gulp-minify-html');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');
var lazypipe = require('lazypipe');
var path = require('path');
var errorHandler = require('../utilities/error.js');
var dirs = require('../directories.js');
var env = require('../../env.js');

var isLocal = env.ENV !== 'production' && env.ENV !== 'staging';
var templateData = require('../../src/_templates/data/master.js');

/**
 * Process and watch swig templates
 */

var processProductionHTML = lazypipe()
  .pipe(minifyHTML, {quotes: true});

var processSwig = lazypipe()
  .pipe(data, templateData)
  .pipe(swig, {
    load_json: true,
    defaults: {cache: false}
  });

var processProductionSwig = lazypipe()
  .pipe(processSwig)
  .pipe(processProductionHTML);

gulp.task('templates:processSwig', function() {
  return gulp.src(dirs.globs.templates.swig, {base: dirs.paths.src})
    .pipe(gulpif(isLocal, plumber({errorHandler: errorHandler})))
    .pipe(gulpif(!isLocal, processProductionSwig(), processSwig()))
    .pipe(gulp.dest(dirs.paths.dst));
});

/**
 * Process and watch handlebars templates
 */

var handlebarsOption = {
  batch: [path.resolve(__dirname, '../../src/_templates/partials')],
  helpers: require('../../src/_templates/helpers/master.js')
};

var processHandlebars = lazypipe()
  .pipe(data, templateData)
  .pipe(handlebars, templateData, handlebarsOption)
  .pipe(rename, function(path) {
    path.extname = '.html';
  });

var processProductionHandlebars = lazypipe()
  .pipe(processHandlebars)
  .pipe(processProductionHTML);

gulp.task('templates:processHandlebars', function() {
  return gulp.src(dirs.globs.templates.hbs, {base: dirs.paths.src})
    .pipe(gulpif(isLocal, plumber({
      errorHandler: errorHandler
    })))
    .pipe(gulpif(!isLocal, processProductionHandlebars(), processHandlebars()))
    .pipe(gulp.dest(dirs.paths.dst));
});

/**
 * Expose public gulp tasks
 */

gulp.task('templates:process', [
  'templates:processSwig',
  'templates:processHandlebars'
]);
