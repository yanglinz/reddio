'use strict';

var Marty = require('marty');

var SongsAction = Marty.createQueries({
  id: 'SongsPlay',

  playSong: function (url) {
    console.log('song', url);
  }
});

module.exports = SongsAction;
