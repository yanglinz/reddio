const gulp = require('gulp');

require('./tools/gulp/deploy.js');

const deployPipeline = [
  'deploy:surge'
];

gulp.task('deploy', gulp.series(...deployPipeline));
