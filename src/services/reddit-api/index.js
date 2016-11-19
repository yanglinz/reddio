import _ from 'lodash';

import settings from 'settings';

export function parsePost(post) {
  const { kind, data } = post;
  return {
    kind,
    id: data.id,
    name: data.name,
    author: data.author,
    subreddit: data.subreddit,
    score: data.score,
    archived: data.archived,
    isSelf: data.is_self,
    stickied: data.stickied,
    numComments: data.num_comments,
    title: data.title,
    url: data.url,
  };
}

export function getListing(pathname, query) {
  const req = {
    method: 'GET',
    params: query,
  };
  const base = _.trimEnd(settings.REDDIT_URL, '/');
  const path = _.trimEnd(pathname, '/');
  const url = `${base}${path}/.json`;
  return fetch(url, req)
    .then(res => res.json())
    .then(res => _.map(res.data.children, parsePost));
}
