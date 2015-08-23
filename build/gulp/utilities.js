var _ = require('lodash');
var path = require('path');
var childProcess = require('child_process');

function spawnChildProcess(command, options) {
  var params = _.defaults(options, {
    cwd: path.resolve(__dirname, '../..'),
    callback: _.noop
  });

  var bin = _.first(command.split(' '));
  var payload = _.rest(command.split(' '));
  var process = childProcess.spawn(bin, payload, {
    cwd: params.cwd,
    stdio: 'inherit'  // pipe output as is
  });

  process.on('close', params.callback);
}

module.exports = {
  spawnChildProcess: spawnChildProcess
};
