import { EVENTS } from 'state/constants';

export function playCommand(post) {
  return {
    type: EVENTS.PLAY_COMMAND,
    payload: { post },
  };
}
