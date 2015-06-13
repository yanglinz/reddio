var webpack = require('webpack');
var path = require('path');
var util = require('gulp-util');
var env = require('./env.js');
var isLocal = env.ENV !== 'production' && env.ENV !== 'staging';

/**
 * Manage ./src/_assets/js/main.js
 */

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
    modulesDirectories: ['_vendor', 'node_modules']
  },
  plugins: [

    function beepOnError() {
      this.plugin('done', function onCompileDone(stats) {
        if (stats.compilation.errors && stats.compilation.errors.length) {
          util.beep();
        }
      });
    }

  ],
  devtool: '#inline-source-map'
};

/**
 * Set production options
 */

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
