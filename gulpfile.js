var gulp = require('gulp');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');

// split gulp tasks across multiple files
requireDir('./gulp/tasks', {recurse: true});

gulp.task('dst', function buildLocalTask(callback) {
  runSequence(
    'server:clean',
    'static:process',
    'templates:process',
    'vendor:process',
    'assets:process',
    'fixtures:process',
    'webpack:build',
    callback
  );
});

gulp.task('build', function buildS3Task(callback) {
  runSequence(
    'dst',
    'build:build',
    callback
  );
});

gulp.task('deploy', function deployS3Task(callback) {
  runSequence(
    'deploy:publish',
    callback
  );
});

gulp.task('serve', function developmentServerTask(callback) {
  runSequence(
    'dst',
    ['server:start', 'watch'],
    callback
  );
});
