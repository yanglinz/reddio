'use strict';

var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],

    frameworks: ['mocha'],

    reporters: ['mocha'],

    files: [
      'karma.webpack.js'
    ],

    preprocessors: {
      'karma.webpack.js': ['webpack']
    },

    webpack: {
      module: {
        loaders: [
          {test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules|_vendor)/}
        ]
      },
      resolve: {
        modulesDirectories: [
          '_vendor',
          'node_modules'
        ]
      }
    },

    plugins: [
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-chrome-launcher"),
      require("karma-mocha-reporter"),
      require("karma-sourcemap-loader")
    ],

    singleRun: true,
    colors: true,
    webpackServer: {
      noInfo: true // don't log webpack info to reporter
    }
  });
};
