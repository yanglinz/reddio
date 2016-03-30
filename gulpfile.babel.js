import gulp from 'gulp';

import * as config from './config.js';
import './tools/gulp/fingerprint.js';
import './tools/gulp/template.js';

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

gulp.task('build', gulp.series(...buildPipeline));
gulp.task('watch', gulp.parallel(...watchPipeline));
