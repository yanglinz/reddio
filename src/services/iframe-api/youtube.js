import _ from 'lodash';
import Rx from 'rxjs/Rx';

import * as utilities from 'services/utilities';

const youtubeHost = 'youtube.com';
const youtubeShortHost = 'youtu.be';

export function isYoutube(url) {
  const urlComponents = utilities.parseUrl(url);
  return (
    _.includes(urlComponents.hostname, youtubeHost) ||
    _.includes(urlComponents.hostname, youtubeShortHost));
}

export function getVideoId(videoUrl) {
  const urlComponents = utilities.parseUrl(videoUrl);
  let videoId;
  if (urlComponents.hostname === youtubeShortHost) {
    videoId = urlComponents.pathname.split('/')[1];
  } else {
    let params = urlComponents.search;
    params = params.replace('?', '').split('&');
    params = _.reduce(params, (memo, p) => {
      const key = p.split('=')[0];
      return _.assign({}, memo, { [key]: p.split('=')[1] });
    }, {});
    videoId = params.v;
  }
  return videoId;
}

export function loadScript() {
  /* eslint-disable */
  if (!window['YT']) {var YT = {loading: 0,loaded: 0};}if (!window['YTConfig']) {var YTConfig = {'host': 'http://www.youtube.com'};}if (!YT.loading) {YT.loading = 1;(function(){var l = [];YT.ready = function(f) {if (YT.loaded) {f();} else {l.push(f);}};window.onYTReady = function() {YT.loaded = 1;for (var i = 0; i < l.length; i++) {try {l[i]();} catch (e) {}}};YT.setConfig = function(c) {for (var k in c) {if (c.hasOwnProperty(k)) {YTConfig[k] = c[k];}}};var a = document.createElement('script');a.type = 'text/javascript';a.id = 'www-widgetapi-script';a.src = 'https:' + '//s.ytimg.com/yts/jsbin/www-widgetapi-vflWkc-3E/www-widgetapi.js';a.async = true;var b = document.getElementsByTagName('script')[0];b.parentNode.insertBefore(a, b);})();}
  /* eslint-enable */
}

export function loadAPI() {
  return new Promise((resolve, reject) => {
    function onYouTubeIframeAPIReady() {
      return window.YT
        ? resolve(window.YT)
        : reject();
    }
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    loadScript();
  });
}

export function loadCachedAPI() {
  const loadedAPI = window.YT;
  return loadedAPI
    ? Promise.resolve(loadedAPI)
    : loadAPI();
}

export function playerParameters(overrides) {
  const videoId = '3lSDU48Pr_Q';
  const height = '100%';
  const width = '100%';
  const params = { videoId, height, width };
  return _.defaults({}, params, overrides);
}

const playerMemo = {};

export function loadPlayer(name, params) {
  const { videoId, height, width } = playerParameters(params);
  let player;
  return new Promise((resolve) => {
    const events = { onReady: () => resolve(player) };
    const playerParams = { videoId, height, width, events };
    player = new window.YT.Player(name, playerParams);
    playerMemo[name] = player;
  });
}

export function loadCachedPlayer(name, params) {
  const player = playerMemo[name]
    ? Promise.resolve(playerMemo[name])
    : loadPlayer(name, params);
  return player;
}

export function load(name, params) {
  return Promise.resolve()
    .then(loadCachedAPI)
    .then(() => loadCachedPlayer(name, params));
}

const PLAYER_STATES = {
  0: 'ENDED',
  1: 'PLAYING',
  2: 'PAUSED',
  3: 'BUFFERING',
  5: 'CUED',
};

function getStateChangeEvent(name, event) {
  const state = PLAYER_STATES[event.data];
  return { target: name, state };
}

const PLAYER_ERRORS = {
  2: 'INVALID_PARAMS',
  5: 'HTML5_ERROR',
  100: 'NOT_FOUND',
  101: 'NO_EMBED',
  150: 'NO_EMBED',
};

function getErrorEvent(name, event) {
  const error = PLAYER_ERRORS[event.data];
  return { target: name, error };
}

export function getEvents$(name) {
  return loadCachedPlayer(name)
    .then((player) => {
      const onStateChange = 'onStateChange';
      const onError = 'onError';

      const stateChanges$ = Rx.Observable.create(
        observer => player.addEventListener(onStateChange, e => observer.next(e)));
      const errors$ = Rx.Observable.create(
        observer => player.addEventListener(onError, e => observer.next(e)));

      return Rx.Observable.merge(
        stateChanges$.map(getStateChangeEvent.bind(null, name)),
        errors$.map(getErrorEvent.bind(null, name)),
      );
    });
}

export function play(name, videoUrl) {
  const id = getVideoId(videoUrl);
  return loadCachedPlayer(name)
    .then(player => player.loadVideoById(id));
}

export function pause(name) {
  return loadCachedPlayer(name)
    .then(player => player.pauseVideo());
}

export function unpause(name) {
  return loadCachedPlayer(name)
    .then(player => player.playVideo());
}
