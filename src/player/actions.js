import { PLAYER_ACTIONS } from 'player/constants';

export function pauseCommand() {
  return {
    type: PLAYER_ACTIONS.PAUSE_COMMAND,
  };
}
