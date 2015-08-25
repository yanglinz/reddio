import { map, capitalize, findIndex } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { DropDownMenu } from 'material-ui';
import materialUI from 'core/components/decorators/material-ui.js';

@materialUI
class SubredditSortController extends Component {
  renderSortTypeController() {
    const menuItems = map(this.props.sortTypes, (sortType) => {
      return {
        payload: sortType,
        text: capitalize(sortType)
      }
    });
    const activeIndex = findIndex(menuItems, (item) => {
      return item.payload === this.props.activeSortType;
    });

    return (
      <DropDownMenu
        selectedIndex={activeIndex}
        menuItems={menuItems}
        onChange={() => this.props.handleSortTypeChange()} />
    );
  }

  renderSortRangeController() {
    if (!(this.props.activeSortType === 'top')) {
      return;
    }

    const menuItems = map(this.props.sortRanges, (sortRange) => {
      return {
        payload: sortRange,
        text: capitalize(sortRange)
      }
    });
    const activeIndex = findIndex(menuItems, (item) => {
      return item.payload === this.props.activeSortRange;
    });

    return (
      <DropDownMenu
        selectedIndex={activeIndex}
        menuItems={menuItems}
        onChange={() => this.props.handleSortRangeChange()} />
    );
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
  activeSortRange: PropTypes.string,
  handleSortTypeChange: PropTypes.func.isRequired,
  handleSortRangeChange: PropTypes.func.isRequired
};

export default SubredditSortController;
