var path = require('path');

var targetDir = path.join(__dirname, '../../src/_assets/scripts');

var baseConfig = {
  debug: true,
  entry: path.resolve(targetDir, 'main.js'),
  output: {
    filename: path.resolve(targetDir, '[name].bundle.js'),
    chunkFilename: path.resolve(targetDir, '[id].bundle.js')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      loader: 'babel-loader'
    }]
  },
  resolve: {
    modulesDirectories: ['node_modules']
  }
};

module.exports = baseConfig;
