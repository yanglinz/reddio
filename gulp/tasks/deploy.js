'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var awsPublish = require('gulp-awspublish');
var dirs = require('./../directories.js');
var env = require('./../../env.js');


/*
 * Push build to Amazon S3 bucket
 *
 */

var publisherConf = {
  params: {
    Bucket:        env.AWS_BUCKET_NAME,
  },
  accessKeyId:     env.AWS_ACCESS_KEY,
  secretAccessKey: env.AWS_SECRET_KEY,
  region:          env.AWS_REGION
};

gulp.task('deploy:publishShortCache', function () {
  var publisher = awsPublish.create(publisherConf);
  var headers = {
    'Cache-Control': 'max-age=300, no-transform, public'  // cache for 5 minutes
  };
  return gulp.src(dirs.globs.build.final.short)
    .pipe(publisher.publish(headers, {force: true}))
    .pipe(awsPublish.reporter({}));
});

gulp.task('deploy:publishLongCache', function () {
  var publisher = awsPublish.create(publisherConf);
  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'  // cache for 365 days
  };
  return gulp.src(dirs.globs.build.final.long)
    .pipe(publisher.publish(headers, {force: true}))
    .pipe(awsPublish.reporter({}));
});


/*
 * Expose public gulp tasks
 *
 */

gulp.task('deploy:publish', function (callback) {
  runSequence(
    'deploy:publishShortCache',
    'deploy:publishLongCache',
    callback
  );
});
