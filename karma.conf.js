require('webpack');

module.exports = function karmaConfig(config) {
  config.set({
    browsers: ['Chrome'],

    frameworks: ['mocha'],

    reporters: ['mocha', 'junit', 'coverage'],

    files: [
      'src/_assets/scripts/**/__tests__/*.js'
    ],

    preprocessors: {
      'src/_assets/scripts/**/__tests__/**': ['webpack', 'coverage']
    },

    webpack: {
      module: {
        loaders: [
          {test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules|_vendor)/}
        ],
        postLoaders: [{
          test: /\.js$/,
          exclude: /(node_modules|_vendor)\//,
          loader: 'istanbul-instrumenter'  // get code coverage to work with webpack
        }]
      },
      resolve: {
        modulesDirectories: [
          '_vendor',
          'node_modules'
        ]
      }
    },

    plugins: [
      require('karma-coverage'),
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-chrome-launcher'),
      require('karma-mocha-reporter'),
      require('karma-junit-reporter'),
      require('karma-sourcemap-loader')
    ],

    junitReporter: {
      outputFile: 'test-results.xml',
      suite: ''
    },

    coverageReporter: {
      type: 'json',
      dir: 'coverage/'
    },

    singleRun: true,
    colors: true,
    webpackServer: {
      noInfo: true // don't log webpack info to reporter
    }
  });
};
