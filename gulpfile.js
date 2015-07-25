var gulp = require('gulp');

require('./build/gulp/build.js');
require('./build/gulp/deploy.js');
require('./build/gulp/development.js');

gulp.task('build', ['build:all']);
gulp.task('run', ['development:server']);
gulp.task('deploy', ['deploy:surge']);
gulp.task('default', ['run']);
