import { all, isEmpty, includes } from 'lodash';
import React, { PropTypes } from 'react';
import RouterComponent from 'core/components/higher-order/router.jsx';

const ALLOWED_SUBREDDITS = [
  'listentothis'
];
const ALLOWED_SORT_TYPES = [
  'new',
  'hot',
  'top'
];
const ALLOWED_SORT_RANGE = [
  'hour',
  'day',
  'week',
  'month',
  'year',
  'all'
];

class SubredditContainer extends RouterComponent {
  componentDidMount() {
    this.handle404IfNeeded();
  }

  componentDidUpdate() {
    this.handle404IfNeeded();
  }

  getSubredditParams() {
    const subreddit = this.props.params.subreddit;
    let sortType = this.props.params.sortType;
    let sortRange = this.props.params.sortRange;

    if (subreddit && !sortType) {
      sortType = 'hot';
    }
    if (sortType === 'top' && !sortRange) {
      sortRange = 'day';
    }

    return {
      subreddit: subreddit,
      sortType: sortType,
      sortRange: sortRange
    }
  }

  handle404IfNeeded() {
    const { subreddit, sortType, sortRange } = this.getSubredditParams();
    const isValidSubreddit = includes(ALLOWED_SUBREDDITS, subreddit);
    const isValidSortType = includes(ALLOWED_SORT_TYPES, sortType) || isEmpty(sortType);
    const isValidSortRange = includes(ALLOWED_SORT_RANGE, sortRange) || isEmpty(sortRange);

    if (!(isValidSubreddit && isValidSortType && isValidSortRange)) {
      this.transitionTo('404');
    }
    if (sortType !== 'top' && sortRange) {
      this.transitionTo('404');
    }
  }

  render() {
    const { subreddit, sortType, sortRange } = this.getSubredditParams();
    return (
      <div>
        <h1>Subreddit container {subreddit} {sortType} {sortRange}</h1>
      </div>
    );
  }
}

export default SubredditContainer;
