import { REDDIT_ACTIONS } from 'reddit/constants';

export function playCommand(post) {
  return {
    type: REDDIT_ACTIONS.PLAY_COMMAND,
    payload: { post },
  };
}
