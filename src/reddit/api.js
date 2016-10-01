import _ from 'lodash';

import settings from 'core/settings';

export function getListing(pathname, query) {
  const req = {
    method: 'GET',
    params: query
  };
  const base = _.trimEnd(settings.REDDIT_URL, '/');
  const path = _.trimEnd(pathname, '/');
  const url = `${base}${path}/.json`;
  return fetch(url, req).then(res => res.json());
}
