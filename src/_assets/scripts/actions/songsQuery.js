var _ = require('lodash');
var Marty = require('marty');
var songsConstants = require('../constants/songsConstants.js');
var reddit = require('../lib/reddit.js');

var SongsQuery = Marty.createQueries({
  id: 'SongsQuery',

  fetchSongs: function (listingType, last) {
    let request;
    let payload = last ? {after: last} : {};
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
