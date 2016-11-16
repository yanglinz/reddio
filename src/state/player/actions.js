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

export function onEvent(event) {
  const payload = event;
  return { type: EVENTS.ON_EVENT, payload };
}

export function noop() {
  return { type: EVENTS.NOOP };
}
