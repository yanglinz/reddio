import gulp from 'gulp';
import data from 'gulp-data';
import nunjucks from 'gulp-nunjucks';

import { webpackAssets, webpackWatchAssets } from '../../.config/webpack.js';
import { browserConfigs } from '../../config.js';

const templates = ['src/**/*.html'];

function buildTemplate() {
  return gulp.src(templates)
    .pipe(data(webpackAssets))
    .pipe(data(browserConfigs))
    .pipe(nunjucks.compile())
    .pipe(gulp.dest('dist'));
}

function buildWatchTemplate() {
  return gulp.src(templates)
    .pipe(data(webpackWatchAssets))
    .pipe(data(browserConfigs))
    .pipe(nunjucks.compile())
    .pipe(gulp.dest('dist'));
}

function watchTemplate() {
  return gulp.watch(templates, buildWatchTemplate);
}

gulp.task('template:build', buildTemplate);
gulp.task('template:watch', gulp.series(buildWatchTemplate, watchTemplate));
