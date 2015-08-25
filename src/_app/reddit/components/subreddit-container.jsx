import React, { Component, PropTypes } from 'react';
import SubredditListings from 'reddit/components/subreddit-listing.jsx';
import SubredditSortController from 'reddit/components/subreddit-sort-controller.jsx';
import { SUBREDDITS, SORT_TYPES, SORT_RANGES } from 'reddit/constants.js';

class SubredditContainer extends Component {
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
          activeSortRange={activeSortRange} />
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
