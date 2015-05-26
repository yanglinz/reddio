import Marty from 'marty';
import playerConstants from '../constants/playerConstants.js';

let PlayerAction = Marty.createQueries({
  id: 'PlayerAction',

  playSong: function playSong(song) {
    this.dispatch(playerConstants.PLAY_SONG, song);
  }
});

export default PlayerAction;
