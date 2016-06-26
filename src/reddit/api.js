import _ from 'lodash';
import invariant from 'invariant';

import { REDDIT_SORT_TYPES } from 'reddit/constants.js';

export function listingUrl(baseUrl, sortType) {
  const base = _.trimEnd(baseUrl, '/');
  const type = sortType.toLowerCase();
  return `${base}/${type}.json`;
}

export function listingParams(overrides = {}) {
  const sortRange = overrides.sortRange || overrides.t;
  const { after, before, count, limit } = _.assign({ limit: 25 }, overrides);
  return { t: sortRange, after, before, count, limit };
}

export function listingPosts(result) {
  return result;
}

export function getListing(baseUrl, sortType, params) {
  invariant(_.includes(REDDIT_SORT_TYPES, sortType), 'expected valid sort type');
  const req = {
    method: 'GET',
    params: listingParams(params)
  };
  return fetch(listingUrl(baseUrl, sortType), req)
    .then(res => res.json())
    .then(listingPosts);
}
