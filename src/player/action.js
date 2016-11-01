import { PLAYER_ACTIONS } from 'player/constants';

export function pausePlayer() {
  return {
    type: PLAYER_ACTIONS.PAUSE_PLAYER,
  };
}
