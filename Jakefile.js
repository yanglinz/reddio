const path = require('path');

const env = require('./environment');

const { jake, task, desc, complete } = global;

const BIN = path.join(__dirname, 'node_modules/.bin');
const FIREBASE = path.join(BIN, 'firebase');
const WEBPACK = path.join(BIN, 'webpack');
const WEBPACK_DEV_SERVER = path.join(BIN, 'webpack-dev-server');

const execOptions = {
  interactive: true,
  printStdout: true,
  printStderr: true
};

desc('Build deploy artifact');
task('build', [], () => {
  const buildCmd = env.WINDOWS
    ? `set NODE_ENV=production&&${WEBPACK} --progress&&set NODE_ENV=`
    : `NODE_ENV=production ${WEBPACK} --progress`;
  const cmds = [buildCmd];
  jake.exec(cmds, execOptions, complete);
});

task('deploy', [], () => {
  const cmds = [
    `${FIREBASE} deploy --token ${env.FIREBASE_TOKEN}`,
  ];
  jake.exec(cmds, execOptions, complete);
});
