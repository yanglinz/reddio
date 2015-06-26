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

  nextSong: function playNextSong() {
    this.dispatch(PlayerConstants.PLAY_NEXT_SONG);
  },

  prevSong: function playPrevSong() {
    this.dispatch(PlayerConstants.PLAY_PREV_SONG);
  }
});

export default PlayerAction;
