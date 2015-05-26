'use strict';

import Marty from 'marty';
import songsConstants from '../constants/songsConstants.js';
import reddit from '../lib/reddit.js';

let SongsQuery = Marty.createQueries({
  id: 'SongsQuery',

  fetchSongs: function (listingType, after="") {
    const payload = after ? {after: after} : {};
    let request = reddit.get(listingType, payload);
    if (request) {
      request.then((function (songs) {
        this.dispatch(songsConstants.RECEIVE_SONGS, listingType, songs);
      }).bind(this));
    }
  }
});

export default SongsQuery;
