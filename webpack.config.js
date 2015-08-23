var path = require('path');
var _ = require('lodash');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer-core');
var settings = require('./settings.js');

/**
 * Define base config for webpack.
 * This is the set of config that affects builds for all environments
 */

var config = {
  entry: ['./src/_app/main'],
  output: {
    path: path.join(__dirname, 'src/_app'),
    filename: '[name].bundle.js'
  },
  plugins: [],
  module: {
    loaders: [{
      test: /\.(js|jsx)?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src'),
      exclude: /node_modules/
    }]
  },
  resolve: {
    root: [
      path.join(__dirname, 'src/_app')
    ]
  }
};

/**
 * Configure css, postcss and cssnext post-processors
 */

var cssLoaders = 'css-loader!cssnext-loader!postcss-loader';

config.module.loaders = [].concat(config.module.loaders, {
  test: /\.css$/,
  loader: settings.IS_PROD ? ExtractTextPlugin.extract(cssLoaders) : 'style-loader!'.concat(cssLoaders)
});

if (settings.IS_PROD) {
  config.plugins = [].concat(config.plugins, [
    new ExtractTextPlugin('main.bundle.css', {allChunks: true})
  ]);
}

config.postcss = function() {
  return [
    autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'ie 8', 'ie 9'],
      cascade: false,
      remove: false
    })
  ];
};

/**
 * Extend the base config for dev development environments
 */

if (settings.IS_LOCAL) {
  config.debug = true;
  config.devtool = 'eval';
}

/**
 * Configure react hot loader
 */

if (settings.IS_LOCAL) {
  config.entry = [].concat([
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  ], config.entry);

  config.output.publicPath = path.resolve('/_app/');

  config.plugins = [].concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ], config.plugins);

  _.each(config.module.loaders, function(loader) {
    // for instances where babel loader is used, react-hot loader must precede it for HMR to work
    if (_.contains(loader.loaders, 'babel')) {
      loader.loaders = [].concat('react-hot', loader.loaders);
    }
  });
}

/**
 * Configure webpack dev server
 */

if (settings.IS_LOCAL) {
  config.devServer = {
    contentBase: './src/',
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    port: 3000
  };
}

/**
 * Configure uglify and dedupe
 */

if (settings.IS_PROD) {
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
