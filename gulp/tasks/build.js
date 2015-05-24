'use strict';

var gulp = require('gulp');
var rimraf = require('rimraf');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var runSequence = require('run-sequence');
var path = require('path');
var dirs = require('./../directories.js');

/**
 * Run build setup
 */

gulp.task('build:clean', function(callback) {
  rimraf(dirs.paths.build, callback);
});

gulp.task('build:copy', function() {
  return gulp.src(dirs.globs.build.origin.nonMD5)
    .pipe(gulp.dest(dirs.paths.build));
});

/**
 * Append md5 to bust cache upon deploy
 */

gulp.task('build:rev', function() {
  return gulp.src(dirs.globs.build.origin.MD5)
    .pipe(rev())
    .pipe(gulp.dest(dirs.paths.build))
    .pipe(rev.manifest('manifest.json'))
    .pipe(gulp.dest(dirs.paths.build));
});

gulp.task('build:revReplace', function() {
  return gulp.src(dirs.globs.build.final.all)
    .pipe(revReplace({
      manifest: gulp.src(path.resolve(dirs.paths.build, './manifest.json'))
    }))
    .pipe(gulp.dest(dirs.paths.build));
});

/**
 * Expose public gulp tasks
 */

gulp.task('build:build', function(callback) {
  runSequence(
    'build:clean',
    'build:copy',
    'build:rev',
    'build:revReplace',
    callback
  );
});
