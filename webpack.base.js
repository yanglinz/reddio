'use strict';

var webpack = require('webpack');
var path = require('path');
var util = require('gulp-util');
var env = require('./env.js');

/**
 * Manage ./src/_assets/js/main.js
 */

function beepOnError() {
  this.plugin('done', function(stats) {
    if (stats.compilation.errors && stats.compilation.errors.length) {
      util.beep();
    }
  });
}

var config = {
  debug: env.ENV === 'local',
  entry: path.resolve(__dirname, './src/_assets/scripts/main.js'),
  output: {
    filename: path.resolve(__dirname, './dst/_assets/scripts/[name].js'),
    chunkFilename: path.resolve(__dirname, './dst/_assets/scripts/[id].bundle.js')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [/_vendor/, /node_modules/],
      loader: 'babel-loader'
    }]
  },
  resolve: {
    alias: {
      jquery: path.resolve(__dirname, './src/_vendor/jquery/dist/jquery.js')
    },
    modulesDirectories: ['_vendor', 'node_modules']
  },
  plugins: [
    beepOnError
  ],
  devtool: '#inline-source-map'
};

/**
 * Set production options
 */

var isLocal = env.ENV !== 'production' && env.ENV !== 'staging';

if (!isLocal) {
  config.plugins = config.plugins || [];
  config.plugins = config.plugins.concat([
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
  ]);
  config.devtool = undefined;
}

/**
 * Export app and asset configs
 */

module.exports = [config];
