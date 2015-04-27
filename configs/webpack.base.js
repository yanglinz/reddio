'use strict';

var _ = require('lodash');
var webpack = require('webpack');
var path = require('path');
var env = require('./env.js');


/**
 * Manage files in ./src/_app/
 */

var appConfig = {
  entry: path.resolve(__dirname, './../src/_app/main.js'),

  output: {
    filename: path.resolve(__dirname, './../dst/_app/[name].js'),
    chunkFilename: path.resolve(__dirname, './../dst/_app/[id].bundle.js')
  }
};


/**
 * Manage files in ./src/_assets/js/
 */

var assetConfig = {
  entry: path.resolve(__dirname, './../src/_assets/scripts/main.js'),

  output: {
    filename: path.resolve(__dirname, './../dst/_assets/scripts/[name].js'),
    chunkFilename: path.resolve(__dirname, './../dst/_assets/scripts/[id].bundle.js')
  }
};


/**
 * Create shared configs
 */

var configs = [appConfig, assetConfig];

_.each(configs, function (cfg) {
  cfg.debug = env.ENV === 'local';

  cfg.module = {
    loaders: [{
      test: /\.js$/,
      exclude: [/_vendor/, /node_modules/],
      loader: 'babel-loader'
    }]
  };

  cfg.devtool = '#inline-source-map';

  cfg.plugins = [
    new webpack.IgnorePlugin(/vertx/)
  ];

  cfg.resolve = {
    modulesDirectories: ['_vendor', 'node_modules']
  };
});


/**
 * Set production options
 */

var isLocal = env.ENV !== 'production' && env.ENV !== 'staging';

if(!isLocal) {
  _.each(configs, function (cfg) {
    cfg.plugins = cfg.plugins || [];
    cfg.plugins = cfg.plugins.concat([
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
        sourceMap: true
      })
    ]);
  });
}


/**
 * Export app and asset configs
 */

module.exports = configs;
