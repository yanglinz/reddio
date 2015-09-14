import { isEmpty, extend, findIndex, first, last } from 'lodash';
import {
  SET_ACTIVE_SONG,
  SET_SONGS,
  SET_TO_PLAY,
  SET_TO_PAUSE,
  PLAY_NEXT_SONG,
  PLAY_PREV_SONG
} from 'player/state/actions.js';

const initialState = {
  isPlaying: false,
  activeSong: {},
  songs: []
};

function servicesReducer(state=initialState, action={}) {
  const hasSongs = !isEmpty(state.songs);
  const hasActiveSong = !isEmpty(state.activeSong);

  switch (action.type) {
  case SET_ACTIVE_SONG:
    return extend({}, state, {
      isPlaying: true,
      activeSong: action.song
    });
  case SET_SONGS:
    return extend({}, state, {
      songs: action.songs
    });
  case SET_TO_PLAY:
    return extend({}, state, {
      isPlaying: true
    });
  case SET_TO_PAUSE:
    return extend({}, state, {
      isPlaying: false
    });
  case PLAY_NEXT_SONG:
    if (hasSongs) {
      if (hasActiveSong) {
        const isActiveSongLast = state.activeSong.id === (last(state.songs) || {}).id;
        const activeSongIndex = findIndex(state.songs, (song) => song.id === state.activeSong.id);
        state.activeSong = isActiveSongLast ? {} : state.songs[activeSongIndex + 1];
        state.isPlaying = true;
      }
    }
    return state;
  case PLAY_PREV_SONG:
    if (hasSongs) {
      if (hasActiveSong) {
        const isActiveSongFirst = state.activeSong.id === (first(state.songs) || {}).id;
        const activeSongIndex = findIndex(state.songs, (song) => song.id === state.activeSong.id);
        state.activeSong = isActiveSongFirst ? state.activeSong : state.songs[activeSongIndex - 1];
        state.isPlaying = true;
      }
    }
    return state;
  default:
    return state;
  }
}

export default servicesReducer;
