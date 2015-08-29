import { map, capitalize, findIndex } from 'lodash';
import React, { PropTypes } from 'react';
import { DropDownMenu } from 'material-ui';
import RouterComponent from 'core/components/higher-order/router.jsx';
import materialUI from 'core/components/decorators/material-ui.js';

@materialUI
class SubredditSortController extends RouterComponent {
  handleChangeSortType(e, selectedIndex, menuItem) {
    const sortType = menuItem.payload;
    const { activeSubreddit } = this.props;
    const urlPath = `/r/${activeSubreddit}/${sortType}`;
    this.transitionTo(urlPath);
  }

  handleChangeSortRange(e, selectedIndex, menuItem) {
    const sortRange = menuItem.payload;
    const { activeSubreddit, activeSortType } = this.props;
    const urlPath = `/r/${activeSubreddit}/${activeSortType}/${sortRange}`;
    this.transitionTo(urlPath);
  }

  renderSortTypeController() {
    const menuItems = map(this.props.sortTypes, (sortType) => {
      return {
        payload: sortType,
        text: capitalize(sortType)
      };
    });
    const activeIndex = findIndex(menuItems, (item) => {
      return item.payload === this.props.activeSortType;
    });

    return (
      <DropDownMenu
        selectedIndex={activeIndex}
        menuItems={menuItems}
        onChange={this.handleChangeSortType.bind(this)} />
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
      };
    });
    const activeIndex = findIndex(menuItems, (item) => {
      return item.payload === this.props.activeSortRange;
    });

    return (
      <DropDownMenu
        selectedIndex={activeIndex}
        menuItems={menuItems}
        onChange={this.handleChangeSortRange.bind(this)} />
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
  activeSubreddit: PropTypes.string.isRequired,
  sortTypes: PropTypes.array.isRequired,
  activeSortType: PropTypes.string.isRequired,
  sortRanges: PropTypes.array.isRequired,
  activeSortRange: PropTypes.string
};

export default SubredditSortController;
