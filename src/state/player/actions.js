import { EVENTS } from 'state/constants';

export function loadIframe() {
  return { type: EVENTS.LOAD_IFRAME };
}

export function loadIframeDone() {
  return { type: EVENTS.LOAD_IFRAME_DONE };
}

export function loadIframeFail() {
  return { type: EVENTS.LOAD_IFRAME_FAIL };
}

export function receivePosts(response) {
  const payload = { response };
  return { type: EVENTS.RECEIVE_POSTS, payload };
}

export function playCommand(post) {
  const payload = { post };
  return { type: EVENTS.PLAY_COMMAND, payload };
}

export function playing(post) {
  const payload = { post };
  return { type: EVENTS.PLAYING, payload };
}

export function pauseCommand() {
  return { type: EVENTS.PAUSE_COMMAND };
}

export function pausing() {
  return { type: EVENTS.PAUSING };
}

export function unpauseCommand() {
  return { type: EVENTS.UNPAUSE_COMMAND };
}

export function unpausing() {
  return { type: EVENTS.UNPAUSING };
}

export function nextCommand() {
  return { type: EVENTS.NEXT_COMMAND };
}

export function nextPlaying() {
  return { type: EVENTS.NEXT_PLAYING };
}

export function prevCommand() {
  return { type: EVENTS.PREV_COMMAND };
}

export function prevPlaying() {
  return { type: EVENTS.PREV_PLAYING };
}

export function onEvent(event) {
  const payload = event;
  return { type: EVENTS.ON_EVENT, payload };
}

export function noop() {
  return { type: EVENTS.NOOP };
}
