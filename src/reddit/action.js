import { REDDIT_ACTIONS } from 'reddit/constants';

export function playPost(post) {
  return {
    type: REDDIT_ACTIONS.PLAY_POST,
    payload: { post }
  };
}
