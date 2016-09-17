const path = require('path');

const { jake, task, desc, complete } = global;

const BIN = path.join(__dirname, 'node_modules/.bin');
const ESLINT = path.join(BIN, 'eslint');
const KARMA = path.join(BIN, 'karma');
const PROTRACTOR = path.join(BIN, 'protractor');
const WEBPACK = path.join(BIN, 'webpack');
const WEBPACK_DEV_SERVER = path.join(BIN, 'webpack-dev-server');

const execOptions = { interactive: true, printStdout: true, printStderr: true };

desc('Lint code for style errors');
task('lint', [], () => {
  const cmds = [
    `${ESLINT} .`
  ];
  jake.exec(cmds, execOptions, complete);
});

desc('Build deploy artifact');
task('build', [], () => {
  const cmds = [
    `NODE_ENV=production ${WEBPACK} --progress -p`
  ];
  jake.exec(cmds, execOptions, complete);
});

desc('Run webpack in watch mode');
task('watch', [], () => {
  const cmds = [
    `${WEBPACK_DEV_SERVER} --inline --hot --config webpack.watch.config`
  ];
  jake.exec(cmds, execOptions, complete);
});

task('test', [], () => {
  const cmds = [
    `${KARMA} start --single-run`
  ];
  jake.exec(cmds, execOptions, complete);
});

task('test-watch', [], () => {
  const cmds = [
    `${KARMA} start`
  ];
  jake.exec(cmds, execOptions, complete);
});

task('test-e2e', [], () => {
  const cmds = [
    `${PROTRACTOR} protractor.conf.js`
  ];
  jake.exec(cmds, execOptions, complete);
});

desc('Remove build artifacts and temporary files');
task('clean', [], () => {
  jake.rmRf('dist');
});
