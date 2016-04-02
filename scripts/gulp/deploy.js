import assert from 'assert';
import path from 'path';

import gulp from 'gulp';
import surge from 'gulp-surge';

import * as config from '../../config.js';

function deploySurge() {
  assert(config.SURGE_LOGIN, 'deploySurge expects SURGE_LOGIN');
  assert(config.SURGE_TOKEN, 'deploySurge expects SURGE_TOKEN');
  assert(config.SURGE_DOMAIN, 'deploySurge expects SURGE_DOMAIN');

  const projectRoot = path.resolve(__dirname, '../..');
  return surge({
    project: path.resolve(projectRoot, 'dist'),
    domain: config.SURGE_DOMAIN
  });
}

gulp.task('deploy:surge', deploySurge);
