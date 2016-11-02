import _ from 'lodash';

/**
 * Define pre-selected list of subreddits
 */
export const SUBREDDITS = {
  listentothis: {
    name: 'Listen to This',
    url: 'https://www.reddit.com/r/listentothis',
  },
};

/**
 * Define reddit posts sort types
 */
const _REDDIT_SORT_TYPES = [
  'hot',
  'new',
  'rising',
  'controversial',
  'random',
  'top',
];

export const REDDIT_SORT_TYPES = _.zipObject(_REDDIT_SORT_TYPES, _REDDIT_SORT_TYPES);

/**
 * Define reddit posts sort ranges, which only applies to the TOP sort type
 */
const _REDDIT_SORT_RANGES = [
  'hour',
  'day',
  'weel',
  'month',
  'year',
  'all',
];

export const REDDIT_SORT_RANGES = _.zipObject(_REDDIT_SORT_RANGES, _REDDIT_SORT_RANGES);

/**
 * Define redux action names to modify the state atom
 */
const _REDDIT_ACTIONS = [
  'REQUEST_POSTS',
  'RECEIVE_POSTS',
  'FETCH_POSTS_ERROR',
  'PLAY_POST',
];

export const REDDIT_ACTIONS = _.zipObject(_REDDIT_ACTIONS, _REDDIT_ACTIONS);
