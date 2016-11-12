const path = require('path');

const _ = require('lodash');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const env = require('../../environment');

const TARGET_BUILD = 'BUILD';
const TARGET_WATCH = 'WATCH';
const TARGET_TEST = 'TEST';
const TARGET_STORYBOOK = 'STORYBOOK';

function baseConfig() {
  const projectRoot = path.resolve(__dirname, '../..');
  const context = path.resolve(projectRoot, 'src');

  const entry = { main: './main.js' };
  const output = {
    path: path.resolve(projectRoot, 'dist'),
    publicPath: '/',
  };

  const extensions = ['', '.js', '.jsx'];
  const resolve = { extensions };

  return { context, entry, output, resolve };
}

function chunkHashConfig(target) {
  const filename = target === TARGET_BUILD
    ? '[name]-[chunkhash].js'
    : '[name]-[hash].js';
  const chunkFilename = '[chunkhash].js';
  const output = { filename, chunkFilename };
  return { output };
}

function absoluteImportConfig() {
  const modulesDirectories = [
    'node_modules',
    'src',
  ];
  const resolve = { modulesDirectories };
  return { resolve };
}

function htmlEntryConfig(target) {
  const htmlWebpackPlugin = new HTMLWebpackPlugin({
    template: './index.html',
    chunksSortMode: 'dependency',
  });
  const plugins = [htmlWebpackPlugin];
  return target === TARGET_STORYBOOK ? {} : { plugins };
}

function babelConfig() {
  const babelLoader = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel',
  };
  const loaders = [babelLoader];
  const modules = { loaders };
  return { module: modules };
}

function sassConfig(target) {
  const sassLoader = target === TARGET_BUILD ? {
    test: /\.s?css$/,
    loader: ExtractTextPlugin.extract('style', ['css', 'sass']),
  } : {
    test: /\.s?css$/,
    loaders: ['style', 'css', 'sass'],
  };
  const loaders = [sassLoader];

  const extractTextPlugin = new ExtractTextPlugin('main-[hash].css');
  const plugins = [extractTextPlugin];

  const modules = { loaders };
  return target === TARGET_BUILD ? { module: modules, plugins } : { module: modules };
}

function rasterImageConfig() {
  const imageLoader = {
    test: /.\.(gif|png|jpe?g)$/,
    loader: 'url?limit=10000&name=[path][name]-[hash].[ext]',
  };
  const loaders = [imageLoader];
  const modules = { loaders };
  return { module: modules };
}

function svgConfig() {
  const svgLoader = {
    test: /.\.svg$/,
    loader: 'svg-inline',
  };
  const loaders = [svgLoader];
  const modules = { loaders };
  return { module: modules };
}

function environmentConfig() {
  const injectedEnv = {
    'process.env': { NODE_ENV: JSON.stringify(env.NODE_ENV) },
    __WEBPACK_DEFINE__: JSON.stringify(env.CLIENT_ENV),
  };
  const definePlugin = new webpack.DefinePlugin(injectedEnv);
  const plugins = [definePlugin];
  return { plugins };
}

function vendorBundleConfig(target) {
  // http://survivejs.com/webpack/building-with-webpack/splitting-bundles/
  const entry = { vendor: './vendor.js' };
  const preferEntry = true;
  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new webpack.optimize.OccurrenceOrderPlugin(preferEntry),
  ];
  return target === TARGET_BUILD ? { entry, plugins } : {};
}

function productionBundleConfig(target) {
  const plugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ];
  return target === TARGET_BUILD ? { plugins } : {};
}

function devServerConfig() {
  const devServer = {
    port: env.PORT,
    historyApiFallback: true,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: true,
      chunkModules: false,
    },
  };
  return { devServer };
}

function sourceMapConfig(target) {
  const devtool = target === TARGET_BUILD ? 'source-map' : 'eval';
  return { devtool };
}

function webpackConfig(target) {
  const configsCreators = [
    chunkHashConfig,
    absoluteImportConfig,
    htmlEntryConfig,
    babelConfig,
    sassConfig,
    rasterImageConfig,
    svgConfig,
    environmentConfig,
    vendorBundleConfig,
    productionBundleConfig,
    devServerConfig,
    sourceMapConfig,
  ];
  const initialConfig = baseConfig();
  return _.reduce(
    configsCreators,
    (config, configCreator) => merge(config, configCreator(target)),
    initialConfig);
}

function webpackBuildConfig() {
  return webpackConfig(TARGET_BUILD);
}

function webpackWatchConfig() {
  return webpackConfig(TARGET_WATCH);
}

function webpackTestConfig() {
  return webpackConfig(TARGET_TEST);
}

function webpackStorybookConfig() {
  return webpackConfig(TARGET_STORYBOOK);
}

module.exports = {
  webpackBuildConfig,
  webpackWatchConfig,
  webpackTestConfig,
  webpackStorybookConfig,
};
