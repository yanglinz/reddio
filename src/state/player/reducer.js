import _ from 'lodash';

import { isYoutube } from 'services/iframe-api/youtube';
import { isSoundcloud } from 'services/iframe-api/soundcloud';
import { PLAYER_TARGETS, PLAYER_STATES, EVENTS } from 'state/constants';

/**
 * Get initial player state
 */
export function initialState() {
  return {
    currentState: {
      [PLAYER_TARGETS.YOUTUBE]: PLAYER_STATES.LOADING,
      [PLAYER_TARGETS.SOUNDCLOUD]: PLAYER_STATES.LOADING,
    },
    songs: {},
    currentPost: null,
    queue: [],
    shuffledQueue: [],
    history: [],
  };
}

export function selectIsYoutubeActive(state) {
  const { currentPost } = state.player;
  return currentPost
    ? isYoutube(currentPost.data.url)
    : false;
}

export function selectIsSoundcloudActive(state) {
  const { currentPost } = state.player;
  return currentPost
    ? isSoundcloud(currentPost.data.url)
    : false;
}

export function selectIsPlaying(state) {
  const youtubeState = state.player.currentState[PLAYER_TARGETS.YOUTUBE];
  const youtubePlaying = youtubeState === PLAYER_STATES.PLAYING;

  const soundcloudState = state.player.currentState[PLAYER_TARGETS.SOUNDCLOUD];
  const soundcloudPlaying = soundcloudState === PLAYER_STATES.PLAYING;

  return youtubePlaying || soundcloudPlaying;
}

function reduceSetReady(state) {
  const currentState = {
    [PLAYER_TARGETS.YOUTUBE]: PLAYER_STATES.LOADED,
    [PLAYER_TARGETS.SOUNDCLOUD]: PLAYER_STATES.LOADED,
  };
  return _.assign({}, state, { currentState });
}

function reduceCurrentPost(state, action) {
  const { post: currentPost } = action.payload;
  return _.assign({}, state, { currentPost });
}

function reduceCurrentState(state, action) {
  const { payload } = action;
  const currentState = _.assign({}, state.currentState);
  currentState[payload.target] = payload.state;
  return _.assign({}, state, { currentState });
}

const reducerByAction = {
  [EVENTS.LOAD_IFRAME_DONE]: reduceSetReady,
  [EVENTS.PLAY_COMMAND]: reduceCurrentPost,
  [EVENTS.ON_EVENT]: reduceCurrentState,
};

export function playerReducer(state = initialState(), action) {
  const reducer = reducerByAction[action.type] || _.identity;
  return reducer(state, action);
}
