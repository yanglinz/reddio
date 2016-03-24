import path from 'path';


const projectRoot = path.resolve(__dirname, '../..');

/**
 * The base directory (absolute path!) for resolving the entry option.
 * If output.pathinfo is set, the included pathinfo is shortened to this directory.
 */
const CONTEXT = projectRoot;

/**
 * The entry point for the bundle.
 * If you pass a string: The string is resolved to a module which is loaded upon startup.
 */
const ENTRY = './src/app/main';

/**
 * Options affecting the output of the compilation.
 * Output options tell Webpack how to write the compiled files to disk.
 */
const OUTPUT = {};

/**
 * Specifies the name of each output file on disk.
 * Cannot be a path, which is specified elsewhere.
 */
OUTPUT.filename = 'main.bundle.js';

/**
 * The output directory as absolute path.
 */
OUTPUT.path = path.resolve(projectRoot, 'dist/app');

/**
 * Webpack config factory
 */
export function webpackConfig() {
  return {
    context: CONTEXT,
    entry: ENTRY,
    output: OUTPUT
  };
}
