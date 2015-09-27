/**
 * Karma config with ES6, Mocha, Chai, Webpack, Babel, and code coverage
 * medium.com/@scbarrus/how-to-get-test-coverage-on-react-with-karma-babel-and-webpack-c9273d805063
 */

module.exports = function setConfig(config) {
  config.set({
    browsers: ['Chrome'],

    frameworks: ['mocha', 'chai'],

    reporters: ['mocha', 'coverage'],

    files: [
      './karma.test-entry.js'
    ],

    plugins: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-chai',
      'karma-mocha-reporter',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-coverage'
    ],

    preprocessors: {
      './karma.test-entry.js': ['webpack', 'sourcemap']
    },

    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [{
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /(node_modules)/
        }],

        preLoaders: [{
          test: /\.(js|jsx)$/,
          loader: 'isparta-instrumenter-loader',
          exclude: /(tests|__tests__|node_modules)\//
        }]
      }
    },

    webpackServer: {
      noInfo: true  // please don't spam the console when running in karma
    },

    port: 9876,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: false,
    singleRun: true
  });
};
