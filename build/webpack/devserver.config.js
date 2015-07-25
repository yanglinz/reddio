var path = require('path');

var devServerConfig = {
  devServer: {
    contentBase: path.join(__dirname, '../../src'),
    noInfo: false,
    hot: false,
    inline: false
  }
};

module.exports = devServerConfig;
