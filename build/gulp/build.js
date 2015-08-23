var path = require('path');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var utilities = require('./utilities.js');

gulp.task('build:webpack', function(callback) {
  var webpackCli = path.resolve(__dirname, '../../node_modules/.bin/webpack');
  utilities.spawnChildProcess(webpackCli, {callback: callback});
});

gulp.task('build:copy', function() {
  return gulp.src('src/**')
  .pipe(gulp.dest('dist'));
});

gulp.task('build:all', function(callback) {
  runSequence(
    'build:webpack',
    'build:copy',
    callback
  );
});
