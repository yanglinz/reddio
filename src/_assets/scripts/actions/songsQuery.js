import Marty from 'marty';
import SongsConstants from '../constants/songsConstants.js';
import reddit from '../lib/reddit.js';

let SongsQuery = Marty.createQueries({
  id: 'SongsQuery',

  fetchSongs: function fetchSong(listingType, after='') {
    const payload = after ? {after: after} : {};
    let request = reddit.get(listingType, payload);
    if (request) {
      request.then((function dispatchSong(songs) {
        this.dispatch(SongsConstants.RECEIVE_SONGS, listingType, songs);
      }).bind(this));
    }
  }
});

export default SongsQuery;
