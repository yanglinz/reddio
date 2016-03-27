import gulp from 'gulp';

import './tools/gulp/template.js';

const buildPipeline = [
  'template:build'
];

const watchPipeline = [
  'template:watch'
];

gulp.task('build', gulp.series(...buildPipeline));
gulp.task('watch', gulp.parallel(...watchPipeline));
