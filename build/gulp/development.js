import path from 'path';
import gulp from 'gulp';
import { spawnChildProcess } from './utilities.js';

gulp.task('development:server', (callback) => {
  const devServerCli = path.resolve(__dirname, '../../node_modules/.bin/webpack-dev-server');
  spawnChildProcess(devServerCli, {callback: callback});
});
