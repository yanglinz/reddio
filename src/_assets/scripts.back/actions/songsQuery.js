import _ from 'lodash';
import Marty from 'marty';
import SongsConstants from '../constants/songsConstants.js';
import SongsStore from '../stores/songsStore.js';
import reddit from '../lib/reddit.js';

let SongsQuery = Marty.createQueries({
  id: 'SongsQuery',

  fetchSongs: function fetchSong(currentSongs) {
    let sortType = SongsStore.getActiveSortType();
    let last = _.last(currentSongs) || {};
    let after = last.name;
    const payload = after ? {after: after} : {};
    let request = reddit.get(sortType, payload);
    if (request) {
      request.then((function dispatchSong(songs) {
        this.dispatch(SongsConstants.RECEIVE_SONGS, sortType, songs);
      }).bind(this));
    }
  }
});

export default SongsQuery;
