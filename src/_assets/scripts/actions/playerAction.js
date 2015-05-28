import Marty from 'marty';
import PlayerConstants from '../constants/playerConstants.js';
import SongStore from '../stores/songsStore.js';

let PlayerAction = Marty.createQueries({
  id: 'PlayerAction',

  playSong: function playSong(song) {
    // set song as current song and define queue based on active songs
    let activeSongs = SongStore.getSongs();
    this.dispatch(PlayerConstants.PLAY_SONG, song, activeSongs);
  },

  prevSong: function playPrevSong() {
    // play previous song
  },

  nextSong: function playNextSong() {
    // play next song
  }
});

export default PlayerAction;
