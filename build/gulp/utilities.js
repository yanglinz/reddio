import { defaults, first, rest, noop } from 'lodash';
import path from 'path';
import childProcess from 'child_process';

function spawnChildProcess(command, options) {
  const params = defaults(options, {
    cwd: path.resolve(__dirname, '../..'),
    callback: noop
  });

  const bin = first(command.split(' '));
  const payload = rest(command.split(' '));
  const process = childProcess.spawn(bin, payload, {
    cwd: params.cwd,
    stdio: 'inherit'  // pipe output as is
  });

  process.on('close', params.callback);
}

export { spawnChildProcess };
