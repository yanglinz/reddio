import React, { Component, PropTypes } from 'react';

class SubredditSortController extends Component {
  renderSortTypeController() {
    return this.props.sortTypes.map((sortType) => {
      return (
        <div key={sortType}>
          <h4>{sortType}</h4>
        </div>
      );
    });
  }

  renderSortRangeController() {
    if (!(this.props.activeSortType === 'top')) {
      return null;
    }
    return this.props.sortRanges.map((sortRange) => {
      return (
        <div key={sortRange}>
          <h4>{sortRange}</h4>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="subreddit-sort-controller">
        {this.renderSortTypeController()}
        {this.renderSortRangeController()}
      </div>
    );
  }
}

SubredditSortController.propTypes = {
  sortTypes: PropTypes.array.isRequired,
  activeSortType: PropTypes.string.isRequired,
  sortRanges: PropTypes.array.isRequired,
  activeSortRange: PropTypes.string
};

export default SubredditSortController;
