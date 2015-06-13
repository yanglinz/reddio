var gulp = require('gulp');
var rimraf = require('rimraf');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var sitemap = require('gulp-sitemap');
var filter = require('gulp-filter');
var runSequence = require('run-sequence');
var path = require('path');
var env = require('../../env.js');
var dirs = require('./../directories.js');

/**
 * Run build setup
 */

gulp.task('build:clean', function cleanBuildTask(callback) {
  rimraf(dirs.paths.build, callback);
});

gulp.task('build:copy', function copyBuildTask() {
  return gulp.src(dirs.globs.build.origin.nonMD5)
    .pipe(gulp.dest(dirs.paths.build));
});

/**
 * Append md5 to bust cache upon deploy
 */

gulp.task('build:rev', function buildMD5ManifestTask() {
  return gulp.src(dirs.globs.build.origin.MD5)
    .pipe(rev())
    .pipe(gulp.dest(dirs.paths.build))
    .pipe(rev.manifest('manifest.json'))
    .pipe(gulp.dest(dirs.paths.build));
});

gulp.task('build:revReplace', function replaceMD5ReferenceTask() {
  return gulp.src(dirs.globs.build.destination.all)
    .pipe(revReplace({
      manifest: gulp.src(path.resolve(dirs.paths.build, './manifest.json'))
    }))
    .pipe(gulp.dest(dirs.paths.build));
});

/**
 * Generate a site map
 */

gulp.task('build:generateSitemap', function generateSitemapTask() {
  return gulp.src(dirs.globs.build.origin.all)
    .pipe(filter(['**/*.html', '!**/_templates/**', '!**/_vendor/**']))

    // html in _templates and _vendor are filtered to avoid empty template
    // by products and third party markup listed as pages

    .pipe(sitemap({
      siteUrl: env.SITE_URL,
      changefreq: 'daily',
      priority: '0.5',  // can be 0.0 to 1.0
      spacing: '  '  // 2 spaces
    }))
    .pipe(gulp.dest(dirs.paths.build));
});

/**
 * Expose public gulp tasks
 */

gulp.task('build:build', function buildTask(callback) {
  runSequence(
    'build:clean',
    'build:copy',
    'build:rev',
    'build:revReplace',
    'build:generateSitemap',
    callback
  );
});
