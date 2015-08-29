import path from 'path';
import assert from 'assert';
import gulp from 'gulp';
import { spawnChildProcess } from '../utilities.js';
import settings from '../../settings.js';

gulp.task('deploy:surge', (callback) => {
  assert(settings.SURGE_DOMAIN);
  if (settings.IS_TRAVIS) {
    assert(settings.SURGE_TOKEN);
  }

  const surgeCli = path.resolve(__dirname, '../../node_modules/.bin/surge');
  const targetDir = path.resolve(__dirname, '../../dist');
  const command = [
    surgeCli,
    '--project',
    targetDir,
    '--domain',
    settings.SURGE_DOMAIN
  ].join(' ');
  spawnChildProcess(command, {callback: callback});
});
