import _ from 'lodash';

import settings from 'core/settings';

export function getListing(pathname, query) {
  const req = {
    method: 'GET',
    params: query
  };
  const url = `${settings.REDDIT_URL}/${_.trimEnd(pathname, '/')}/.json`;
  return fetch(url, req).then(res => res.json());
}
