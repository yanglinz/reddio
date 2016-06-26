import _ from 'lodash';
import invariant from 'invariant';

import { REDDIT_SORT_TYPES, REDDIT_SORT_RANGES } from 'reddit/constants.js';

export function listingUrl(baseUrl, sortType) {
  const base = _.trimEnd(baseUrl, '/');
  return `${base}/${sortType}.json`;
}

export function listingParams(overrides = {}) {
  const sortRange = overrides.sortRange || overrides.t;
  invariant(_.includes(REDDIT_SORT_RANGES, sortRange), 'expected valid sort range');
  const { after, before, count, limit } = _.assign({ limit: 25 }, overrides);
  return { t: sortRange, after, before, count, limit };
}

export function getListing(baseUrl, sortType, params) {
  invariant(_.includes(REDDIT_SORT_TYPES, sortType), 'expected valid sort type');
  const req = {
    method: 'GET',
    params: listingParams(params)
  };
  return fetch(listingUrl(baseUrl, sortType), req).then(res => res.json());
}
