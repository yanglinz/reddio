var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var environment = require('./build/environment.js');

var isProd = _.any([
  environment.CI,
  environment.TRAVIS,
  environment.ENV === 'stage',
  environment.ENV === 'staging',
  environment.ENV === 'prod',
  environment.ENV === 'production'
]);

/**
 * Define base config for webpack.
 * This is the set of config that affects builds for all environments
 */

var config = {
  entry: ['./src/_assets/scripts/main'],
  output: {
    path: path.join(__dirname, 'src/_assets/scripts'),
    filename: '[name].bundle.js'
  },
  plugins: [],
  module: {
    loaders: []
  }
};

/**
 * Extend the base config for dev development environments
 */

if (!isProd) {
  config.debug = true;
  config.devtool = 'eval';
}

/**
 * Configure react hot loader
 */

if (!isProd) {
  config.entry = [].concat([
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  ], config.entry);

  config.output.publicPath = '/_assets/scripts/';

  config.plugins = [].concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ], config.plugins);

  config.module.loaders = [].concat({
    test: /\.js?$/,
    loaders: ['react-hot', 'babel'],
    include: path.join(__dirname, 'src')
  }, config.module.loaders);
}

/**
 * Configure webpack dev server
 */

if (!isProd) {
  config.devServer = {
    contentBase: "./src/",
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    port: 3000
  };
}

/**
 * Configure production build
 */

if (isProd) {
  config.plugins = [].concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['require', 'export', '$super']
      },
      compress: {
        warnings: false,
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      },
      sourceMap: false
    })
  ], config.plugins);
}

module.exports = config;