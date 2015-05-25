'use strict';

var Marty = require('marty');

var songsConstants = Marty.createConstants([
  "SONGS_STORE",
  "SONGS_QUERY",
  "FETCH_SONGS",
  "RECEIVE_SONGS"
]);

module.exports = songsConstants;
