import { EVENTS } from 'state/constants';

export function playCommand(post) {
  const payload = { post };
  return { type: EVENTS.PLAY_COMMAND, payload };
}

export function requestPosts(pathname, query) {
  const payload = { pathname, query };
  return { type: EVENTS.REQUEST_POSTS, payload };
}

export function receivePosts(pathname, query, response) {
  const payload = { pathname, query, response };
  return { type: EVENTS.RECEIVE_POSTS, payload };
}

export function fetchPostsError(error) {
  const payload = { error };
  return { type: EVENTS.FETCH_POSTS_ERROR, payload };
}
