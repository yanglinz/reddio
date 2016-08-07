const gulp = require('gulp');

require('./tools/gulp/deploy');

const deployPipeline = [
  'deploy:surge'
];

gulp.task('deploy', gulp.series(...deployPipeline));
