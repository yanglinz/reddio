import Rx from 'rxjs/Rx';

import * as youtube from './youtube';
import * as soundcloud from './soundcloud';

const PARENT_MOUNT = 'player';
const YOUTUBE_MOUNT = 'youtube';
const SOUNDCLOUD_MOUNT = 'soundcloud';

export function createMount(name) {
  const mountNode = document.createElement('div');
  mountNode.id = name;
  mountNode.className = name;
  document.body.appendChild(mountNode);
  return mountNode;
}

export function getOrCreateMount(name) {
  const mountNode = document.getElementById(name);
  return mountNode || createMount(name);
}

export function createChildMount(parent, name) {
  const parentNode = getOrCreateMount(parent);
  const childNode = document.createElement('div');
  childNode.id = name;
  childNode.className = name;
  parentNode.appendChild(childNode);
  return childNode;
}

export function getOrCreateChildMount(parent, name) {
  const childNode = document.getElementById(name);
  return childNode || createChildMount(parent, name);
}

export function createPlayerMount() {
  getOrCreateMount(PARENT_MOUNT);
  getOrCreateChildMount(PARENT_MOUNT, YOUTUBE_MOUNT);
  getOrCreateChildMount(PARENT_MOUNT, SOUNDCLOUD_MOUNT);
}

export function load() {
  createPlayerMount();
  return Promise.all([
    youtube.load(YOUTUBE_MOUNT),
    soundcloud.load(SOUNDCLOUD_MOUNT),
  ]);
}

export function getEvents$() {
  const youtubeEvents$ = youtube.getEvents$(YOUTUBE_MOUNT);
  const soundcloudEvents$ = soundcloud.getEvents$(SOUNDCLOUD_MOUNT);
  return Promise.all([youtubeEvents$, soundcloudEvents$])
    .then(([ytEvents$, scEvents$]) => (
      Rx.Observable.merge(ytEvents$, scEvents$)
    ));
}

export function pause() {
  youtube.pause(YOUTUBE_MOUNT);
  soundcloud.pause(SOUNDCLOUD_MOUNT);
}

export function unpause(url) {
  if (youtube.isYoutube(url)) youtube.unpause(YOUTUBE_MOUNT);
  if (soundcloud.isSoundcloud(url)) soundcloud.unpause(SOUNDCLOUD_MOUNT);
}

export function play(url) {
  pause();
  if (youtube.isYoutube(url)) youtube.play(YOUTUBE_MOUNT, url);
  if (soundcloud.isSoundcloud(url)) soundcloud.play(SOUNDCLOUD_MOUNT, url);
}
