var _ = require('lodash');
var Marty = require('marty');
var songsConstants = require('../constants/songsConstants.js');
var reddit = require('../lib/reddit.js');

var SongsQuery = Marty.createQueries({
  id: 'SongsQuery',

  fetchSongs: function (listingType, lastSongID) {
    let request;
    let payload = lastSongID ? {after: lastSongID} : {};
    if (_.includes(listingType, 'hot')) {
      listingType = 'hotSongs';
      request = reddit.getHot(payload);
    }
    if (request) {
      request.then((function (songs) {
        this.dispatch(songsConstants.RECEIVE_SONGS, listingType, songs);
      }).bind(this));
    }
  }
});

module.exports = SongsQuery;
