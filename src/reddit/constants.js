import _ from 'lodash';

/**
 * Define pre-selected list of subreddits
 */
export const REDDIT_SOURCES = {
  LISTEN_TO_THIS: {
    name: 'Listen to This',
    url: 'https://www.reddit.com/r/listentothis'
  },
  THE_FIRE_HOSE: {
    name: 'The Fire Hose',
    url: 'https://www.reddit.com/user/evilnight/m/thefirehose'
  }
};

/**
 * Define reddit posts sort types
 */
const _REDDIT_SORT_TYPES = [
  'HOT',
  'NEW',
  'RANDOM',
  'TOP'
];

export const REDDIT_SORT_TYPES = _.zipObject(_REDDIT_SORT_TYPES, _REDDIT_SORT_TYPES);

/**
 * Define reddit posts sort ranges, which only applies to the TOP sort type
 */
const _REDDIT_SORT_RANGES = [
  'HOUR',
  'DAY',
  'WEEK',
  'MONTH',
  'YEAR',
  'ALL'
];

export const REDDIT_SORT_RANGES = _.zipObject(_REDDIT_SORT_RANGES, _REDDIT_SORT_RANGES);

/**
 * Define redux action names to modify the state atom
 */
const _REDDIT_ACTIONS = [
  'SET_SOURCE_URL',
  'REQUEST_POSTS',
  'RECEIVE_POSTS',
  'SET_SORT_TYPE',
  'SET_SORT_RANGE'
];

export const REDDIT_ACTIONS = _.zipObject(_REDDIT_ACTIONS, _REDDIT_ACTIONS);
