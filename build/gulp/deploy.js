var path = require('path');
var assert = require('assert');
var gulp = require('gulp');
var utilities = require('../utilities.js');
var environment = require('../environment.js');

gulp.task('deploy:surge', function(callback) {
  assert(environment.SURGE_DOMAIN);
  if (environment.TRAVIS) {
    assert(environment.SURGE_TOKEN);
  }

  var surgeCli = path.resolve(__dirname, '../../node_modules/.bin/surge');
  var targetDir = path.resolve(__dirname, '../../dist');
  var command = [
    surgeCli,
    '--project',
    targetDir,
    '--domain',
    environment.SURGE_DOMAIN
  ].join(' ');
  utilities.spawnChildProcess(command, {callback: callback});
});
