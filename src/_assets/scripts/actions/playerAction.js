'use strict';

import Marty from 'marty';
import playerConstants from '../constants/playerConstants.js';

var PlayerAction = Marty.createQueries({
  id: 'PlayerAction',

  playSong: function (song) {
    this.dispatch(playerConstants.PLAY_SONG, song);
  }
});

export default PlayerAction;
