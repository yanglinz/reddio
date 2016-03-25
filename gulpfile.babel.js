import gulp from 'gulp';

import './tools/gulp/template.js';

const buildPipeline = [
  'template:build'
];

gulp.task('default', gulp.series(...buildPipeline));
