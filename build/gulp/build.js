import path from 'path';
import gulp from 'gulp';
import runSequence from 'run-sequence';
import { spawnChildProcess } from './utilities.js';

gulp.task('build:webpack', (callback) => {
  const webpackCli = path.resolve(__dirname, '../../node_modules/.bin/webpack');
  spawnChildProcess(webpackCli, {callback: callback});
});

gulp.task('build:copy', () => {
  return gulp.src('src/**')
    .pipe(gulp.dest('dist'));
});

gulp.task('build:all', (callback) => {
  runSequence(
    'build:webpack',
    'build:copy',
    callback
  );
});
