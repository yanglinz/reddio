'use strict';

var Marty = require('marty');
var playerConstants = require('../constants/playerConstants.js');

var PlayerAction = Marty.createQueries({
  id: 'PlayerAction',

  playSong: function (song) {
    this.dispatch(playerConstants.PLAY_SONG, song);
  }
});

module.exports = PlayerAction;
