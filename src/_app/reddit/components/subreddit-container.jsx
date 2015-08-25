import React, { Component, PropTypes } from 'react';
import RouterComponent from 'core/components/higher-order/router.jsx';
import SubredditListings from 'reddit/components/subreddit-listing.jsx';
import SubredditSortController from 'reddit/components/subreddit-sort-controller.jsx';
import { SUBREDDITS, SORT_TYPES, SORT_RANGES } from 'reddit/constants.js';

class SubredditContainer extends RouterComponent {
  handleSortTypeChange(sortType) {
    console.log('handleSortTypeChange');
  }

  handleSortRangeChange(sortRange) {
    console.log('handleSortRangeChange');
  }

  render() {
    const { activeSubreddit, activeSortType, activeSortRange } = this.props;
    return (
      <div>
        <h1>Subreddit handler {activeSubreddit} {activeSortType} {activeSortRange}</h1>
        <SubredditListings
          subreddits={SUBREDDITS}
          activeSubreddit={activeSubreddit} />
        <SubredditSortController
          sortTypes={SORT_TYPES}
          activeSortType={activeSortType}
          sortRanges={SORT_RANGES}
          activeSortRange={activeSortRange}
          handleSortTypeChange={this.handleSortTypeChange}
          handleSortRangeChange={this.handleSortRangeChange} />
      </div>
    );
  }
}

SubredditContainer.propTypes = {
  activeSubreddit: PropTypes.string.isRequired,
  activeSortType: PropTypes.string.isRequired,
  activeSortRange: PropTypes.string
};

export default SubredditContainer;
