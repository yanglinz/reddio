import { all, isEmpty, includes } from 'lodash';
import React, { PropTypes } from 'react';
import RouterComponent from 'core/components/higher-order/router.jsx';
import SubredditContainer from 'reddit/components/subreddit-container.jsx';
import { SUBREDDITS, SORT_TYPES, SORT_RANGES } from 'reddit/constants.js';

class SubredditHandler extends RouterComponent {
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
    const isValidSubreddit = includes(SUBREDDITS, subreddit);
    const isValidSortType = includes(SORT_TYPES, sortType) || isEmpty(sortType);
    const isValidSortRange = includes(SORT_RANGES, sortRange) || isEmpty(sortRange);

    if (!(isValidSubreddit && isValidSortType && isValidSortRange)) {
      this.transitionTo('404');
    }
    if (sortType !== 'top' && sortRange) {
      this.transitionTo('404');
    }
  }

  setSortType(sortType) {
    const { subreddit, sortRange } = this.getSubredditParams();
    const newRoute = sortRange ?
      `r/${subreddit}}/${sortType}/${sortRange}` :
      `r/${subreddit}}/${sortType}}`;
    this.transitionTo(newRoute);
  }

  setSortRange(sortRange) {
    const { subreddit, sortType } = this.getSubredditParams();
    const newRoute = `r/${subreddit}}/${sortType}/${sortRange}`;
    this.transitionTo(newRoute);
  }

  render() {
    const { subreddit, sortType, sortRange } = this.getSubredditParams();
    return (
      <SubredditContainer
        activeSubreddit={subreddit}
        activeSortType={sortType}
        activeSortRange={sortRange} />
    );
  }
}

export default SubredditHandler;
