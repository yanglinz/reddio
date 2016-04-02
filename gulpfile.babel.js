import gulp from 'gulp';

import * as config from './config.js';
import './scripts/gulp/deploy.js';
import './scripts/gulp/fingerprint.js';
import './scripts/gulp/template.js';

const buildPipeline = [
  'template:build',
  ...(config.IS_PROD ? [
    'fingerprint:rev',
    'fingerprint:clean'
  ] : [])
];

const watchPipeline = [
  'template:watch'
];

const deployPipeline = [
  'deploy:surge'
];

gulp.task('build', gulp.series(...buildPipeline));
gulp.task('watch', gulp.parallel(...watchPipeline));
gulp.task('deploy', gulp.series(...deployPipeline));
