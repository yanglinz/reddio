'use strict';

var util = require('gulp-util');


var errorHandler = function (e) {
  util.beep();
  console.error(util.colors.magenta('[ERROR]'), ':', e);
  this.emit('end');  // make sure gulp-plumber fails task elegantly
};

module.exports = errorHandler;
