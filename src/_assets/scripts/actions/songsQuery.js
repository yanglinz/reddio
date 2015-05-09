var _ = require('lodash');
var Marty = require('marty');
var songsConstants = require('../constants/songsConstants.js');
var reddit = require('../lib/reddit.js');

var SongsQuery = Marty.createQueries({
  id: 'SongsQuery',

  fetchSongs: function (listingType, lastSongID) {
    const payload = lastSongID ? {after: lastSongID} : {};
    let request = reddit.get(listingType, payload);
    if (request) {
      request.then((function (songs) {
        this.dispatch(songsConstants.RECEIVE_SONGS, listingType, songs);
      }).bind(this));
    }
  }
});

module.exports = SongsQuery;
