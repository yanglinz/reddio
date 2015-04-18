'use strict';

var gulp = require('gulp');
var dirs = require('../directories.js');

gulp.task('watch:all', function () {
  /*
   * Watch sass
   */
  gulp.watch(dirs.globs.assets.css,     ['assets:processCss']);

  /*
   * Watch images
   */
  gulp.watch(dirs.globs.assets.img,     ['assets:processImg']);

  /*
   * Watch handlebars templates
   */
  gulp.watch(dirs.globs.templates.hbs,  ['templates:processHandlebars']);

  /*
   * Watch swig templates
   */
  var swigGlob = [
    dirs.globs.templates.swig,
    dirs.globs.templates.swig.replace('swig', 'json'),
    dirs.globs.templates.swig.replace('swig', 'html')
  ];
  gulp.watch(swigGlob, ['templates:processSwig']);
});

gulp.task('watch', [
  'watch:all',
  'webpack:watch'
]);
