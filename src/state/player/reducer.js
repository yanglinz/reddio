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
    postsByIds: {},
    posts: [],
    currentPost: null,
  };
}

export function selectIsYoutubeActive(state) {
  const { postsByIds, currentPost } = state.player;
  return postsByIds[currentPost]
    ? isYoutube(postsByIds[currentPost].url)
    : false;
}

export function selectIsSoundcloudActive(state) {
  const { postsByIds, currentPost } = state.player;
  return postsByIds[currentPost]
    ? isSoundcloud(postsByIds[currentPost].url)
    : false;
}

export function selectIsPlaying(state) {
  const youtubeState = state.player.currentState[PLAYER_TARGETS.YOUTUBE];
  const youtubePlaying = youtubeState === PLAYER_STATES.PLAYING;

  const soundcloudState = state.player.currentState[PLAYER_TARGETS.SOUNDCLOUD];
  const soundcloudPlaying = soundcloudState === PLAYER_STATES.PLAYING;

  return youtubePlaying || soundcloudPlaying;
}

export function selectCurrentPost(state) {
  const { postsByIds, currentPost } = state.player;
  return postsByIds[currentPost];
}

export function selectNextPost(state) {
  const { postsByIds, posts, currentPost } = state.player;
  const nextIndex = _.indexOf(posts, currentPost) + 1;
  const nextId = posts[nextIndex];
  return postsByIds[nextId];
}

export function selectPrevPost(state) {
  const { postsByIds, posts, currentPost } = state.player;
  const prevIndex = _.indexOf(posts, currentPost) - 1;
  const prevId = posts[prevIndex];
  return postsByIds[prevId];
}

function reduceSetReady(state) {
  const currentState = {
    [PLAYER_TARGETS.YOUTUBE]: PLAYER_STATES.LOADED,
    [PLAYER_TARGETS.SOUNDCLOUD]: PLAYER_STATES.LOADED,
  };
  return _.assign({}, state, { currentState });
}

function reduceReceivePosts(state, action) {
  const { response } = action.payload;
  const postsByIds = _.assign(
    {},
    state.postsByIds,
    _.keyBy(response, post => post.id),
  );
  const posts = _.map(response, post => post.id);
  return _.assign({}, state, { postsByIds, posts });
}

function reducePlayingCommand(state, action) {
  const { post } = action.payload;
  return _.assign({}, state, { currentPost: post.id });
}

function reduceNextPlayingCommand(state) {
  const { posts, currentPost } = state;
  const nextIndex = _.indexOf(posts, currentPost) + 1;
  const nextId = posts[nextIndex];
  return _.assign({}, state, { currentPost: nextId });
}

function reducePrevPlayingCommand(state) {
  const { posts, currentPost } = state;
  const prevIndex = _.indexOf(posts, currentPost) - 1;
  const prevId = posts[prevIndex];
  return _.assign({}, state, { currentPost: prevId });
}

function reduceCurrentState(state, action) {
  const { payload } = action;
  const currentState = _.assign({}, state.currentState);
  currentState[payload.target] = payload.state;
  return _.assign({}, state, { currentState });
}

const reducerByAction = {
  [EVENTS.LOAD_IFRAME_DONE]: reduceSetReady,
  [EVENTS.RECEIVE_POSTS]: reduceReceivePosts,
  [EVENTS.PLAYING]: reducePlayingCommand,
  [EVENTS.NEXT_PLAYING]: reduceNextPlayingCommand,
  [EVENTS.PREV_PLAYING]: reducePrevPlayingCommand,
  [EVENTS.ON_EVENT]: reduceCurrentState,
};

export function playerReducer(state = initialState(), action) {
  const reducer = reducerByAction[action.type] || _.identity;
  return reducer(state, action);
}
