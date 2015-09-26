module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],

    frameworks: ['mocha'],

    reporters: ['mocha'],

    files: [
      './karma.test-entry.js'
    ],

    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-chrome-launcher'),
      require('karma-mocha-reporter'),
      require('karma-sourcemap-loader')
    ],

    preprocessors: {
      './karma.test-entry.js': ['webpack', 'sourcemap']
    },

    webpack: {
      module: {
        loaders: [{
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /(node_modules)/
        }]
      }
    },

    webpackServer: {
      noInfo: true  // please don't spam the console when running in karma!
    },

    port: 9876,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: false,
    singleRun: true
  })
};
