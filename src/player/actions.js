import { EVENTS } from 'state/constants';

export function pauseCommand() {
  return {
    type: EVENTS.PAUSE_COMMAND,
  };
}
