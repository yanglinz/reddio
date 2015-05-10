'use strict';

var nconf = require('nconf');
var path = require('path');

nconf.env().file({file: path.resolve(__dirname, 'env.json')});

module.exports = {
  ENV:             nconf.get('ENV') || 'local',
  AWS_ACCESS_KEY:  nconf.get('AWS_ACCESS_KEY'),
  AWS_SECRET_KEY:  nconf.get('AWS_SECRET_KEY'),
  AWS_REGION:      nconf.get('AWS_REGION'),
  AWS_BUCKET_NAME: nconf.get('AWS_BUCKET_NAME'),
  OPTIMIZE_IMAGES: nconf.get('OPTIMIZE_IMAGES') === "true"
};
