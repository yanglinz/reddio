import gulp from 'gulp';
import './build/gulp/build.js';
import './build/gulp/development.js';

gulp.task('build', ['build:all']);
gulp.task('run', ['development:server']);
gulp.task('default', ['run']);
