var Marty = require('marty');
var songsConstants = require('./../constants/songsConstants.js');

var SongsQuery = Marty.createQueries({
  id: 'helloWorld',

  fetchSongs: function (name) {
    this.dispatch(songsConstants.RECEIVE_SONGS, name);
  }
});

module.exports = SongsQuery;
