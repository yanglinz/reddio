import _ from 'lodash';

export function getListing(pathname, query) {
  const req = {
    method: 'GET',
    params: query
  };
  const url = `http://www.reddit.com/${_.trimEnd(pathname, '/')}/.json`;
  return fetch(url, req).then(res => res.json());
}
