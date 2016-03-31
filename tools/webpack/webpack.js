import path from 'path';

import { DefinePlugin } from 'webpack';

import * as config from '../../config.js';
import { browserConfigs } from '../../config.js';

const projectRoot = path.resolve(__dirname, '../..');

/**
 * The base directory (absolute path!) for resolving the entry option
 */
const CONTEXT = projectRoot;

/**
 * The entry point for the bundle
 */
const ENTRY = './src/app/entry';

/**
 * Options affecting the output of the compilation
 */
const OUTPUT = {};

/**
 * Specifies the name of each output file on disk, cannot be a path
 */
OUTPUT.filename = 'reddio.bundle.js';

/**
 * The output directory as absolute path
 */
OUTPUT.path = path.resolve(projectRoot, 'dist/app');

/**
 * Specifies the public URL address of the output files when referenced in a browser.
 */
OUTPUT.publicPath = '/';

/**
 * Options affecting the normal modules
 */
const MODULE = {};

/**
 * Loaders that affect file transformation
 */
const typescriptLoader = {
  test: /\.tsx?$/,
  loader: 'ts-loader'
};

MODULE.loaders = [typescriptLoader];

/**
 * Webpack dev server
 */
const DEV_SERVER = {};
const DEV_SERVER_WATCH = {};

/**
 * Port for the webpack dev server to run
 */
DEV_SERVER.port = config.PORT;
DEV_SERVER_WATCH.port = DEV_SERVER.port;

/**
 * Serve static assets from build directory
 */
DEV_SERVER.contentBase = path.resolve(projectRoot, 'dist');
DEV_SERVER_WATCH.contentBase = DEV_SERVER.contentBase;

/**
 * Make webpack dev server less noisy
 */
DEV_SERVER.stats = {
  assets: false,
  colors: true,
  version: false,
  hash: false,
  timings: false,
  chunks: true,
  chunkModules: false
};
DEV_SERVER_WATCH.stats = DEV_SERVER.stats;

/**
 * Plugins
 */
const definePlugin = new DefinePlugin({
  __WEBPACK_DEFINE__: JSON.stringify(browserConfigs())
});

const PLUGINS = [definePlugin];

/**
 * Webpack config factory for regular builds
 */
export function webpackConfig() {
  return {
    context: CONTEXT,
    entry: ENTRY,
    output: OUTPUT,
    module: MODULE,
    devServer: DEV_SERVER,
    plugins: PLUGINS
  };
}

/**
 * Webpack config factory for watch development builds
 */
export function webpackWatchConfig() {
  return {
    context: CONTEXT,
    entry: ENTRY,
    output: OUTPUT,
    module: MODULE,
    devServer: DEV_SERVER_WATCH,
    plugins: PLUGINS
  };
}

/**
 * Get an array of scripts and stylesheets for regular builds
 */
export function webpackAssets() {
  const scripts = [`/app/${OUTPUT.filename}`];
  const stylesheets = [];
  return { scripts, stylesheets };
}

/**
 * Get an array of scripts and stylesheets for watch development builds
 */
export function webpackWatchAssets() {
  const scripts = [`/${OUTPUT.filename}`];
  const stylesheets = [];
  return { scripts, stylesheets };
}
