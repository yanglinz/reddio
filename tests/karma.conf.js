// https://medium.com/@scbarrus/how-to-get-test-coverage-on-react-with-karma-babel-and-webpack-c9273d805063

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],

    frameworks: ['mocha', 'chai'],

    reporters: ['mocha', 'coverage'],

    files: [
      './karma.test-entry.js'
    ],

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-coverage'
    ],

    preprocessors: {
      './karma.test-entry.js': ['webpack', 'sourcemap'],
      '../src/**/!(__tests__)/*.js': ['coverage', 'sourcemap']
    },

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [{
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /(node_modules)/
        }],

        postLoaders: [{
          test: /\.(js|jsx)$/,
          loader: 'istanbul-instrumenter',
          exclude: /(node_modules)\//
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
  })
};
