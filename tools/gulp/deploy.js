const assert = require('assert');
const path = require('path');

const gulp = require('gulp');
const surge = require('gulp-surge');

const env = require('../../environment');

function deploySurge() {
  assert(env.SURGE_LOGIN, 'deploySurge expects SURGE_LOGIN');
  assert(env.SURGE_TOKEN, 'deploySurge expects SURGE_TOKEN');
  assert(env.SURGE_DOMAIN, 'deploySurge expects SURGE_DOMAIN');

  const projectRoot = path.resolve(__dirname, '../..');
  return surge({
    project: path.resolve(projectRoot, 'dist'),
    domain: env.SURGE_DOMAIN
  });
}

gulp.task('deploy:surge', deploySurge);
