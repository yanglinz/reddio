var Marty = require('marty');
var songsConstants = require('../constants/songsConstants.js');

var SongsStore = Marty.createStore({
  id: songsConstants.SONGS_STORE,

  handlers: {
    receiveSongs: songsConstants.RECEIVE_SONGS
  },

  getInitialState: function () {
    return {
      listenToThis: {}
    };
  },

  receiveSongs: function () {
    this.setState({
      listenToThis: {
        hello: 'world'
      }
    });
  }
});

module.exports = SongsStore;
