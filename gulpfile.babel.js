import gulp from 'gulp';

import './tools/gulp/template.js';


const buildPipeline = [
  'template:build'
];

gulp.task('build', gulp.series(...buildPipeline));
