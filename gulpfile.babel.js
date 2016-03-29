import gulp from 'gulp';

import './tools/gulp/fingerprint.js';
import './tools/gulp/template.js';

const buildPipeline = [
  'template:build'
];

const watchPipeline = [
  'template:watch'
];

const artifactPipeline = [
  'fingerprint:rev',
  'fingerprint:clean'
];

gulp.task('build', gulp.series(...buildPipeline));
gulp.task('watch', gulp.parallel(...watchPipeline));
gulp.task('artifact', gulp.series(...artifactPipeline));
