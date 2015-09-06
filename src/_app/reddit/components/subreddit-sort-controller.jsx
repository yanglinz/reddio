import { isEmpty, map, capitalize, findIndex } from 'lodash';
import React, { PropTypes } from 'react';
import { DropDownMenu } from 'material-ui';
import RouterComponent from 'core/components/higher-order/router.jsx';
import materialUI from 'core/components/decorators/material-ui.js';

@materialUI
class SubredditSortController extends RouterComponent {
  handleChangeSortType(e, selectedIndex, menuItem) {
    const sortType = menuItem.payload;
    const { activeSubreddit } = this.props;
    const defaultSortRange = 'day';
    const route = sortType === 'top' ?
      `/${activeSubreddit}/${sortType}/${defaultSortRange}` :
      `/${activeSubreddit}/${sortType}`;
    this.transitionTo(route);
  }

  handleChangeSortRange(e, selectedIndex, menuItem) {
    const sortRange = menuItem.payload;
    const { activeSubreddit, activeSortType } = this.props;
    const route = `/${activeSubreddit}/${activeSortType}/${sortRange}`;
    this.transitionTo(route);
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

  renderActiveState() {
    return (
      <div>
        {this.renderSortTypeController()}
        {this.renderSortRangeController()}
      </div>
    );
  }

  renderInactiveState() {
    return (
      <div className="empty"></div>
    );
  }

  render() {
    const { activeSubreddit, activeSortType } = this.props;
    const isActive = !isEmpty(activeSubreddit) && !isEmpty(activeSortType);
    const subredditSortController = isActive ?
      this.renderActiveState() :
      this.renderInactiveState();
    return (
      <div className="subreddit-sort-controller">
        {subredditSortController}
      </div>
    );
  }
}

SubredditSortController.propTypes = {
  activeSubreddit: PropTypes.string,
  sortTypes: PropTypes.array.isRequired,
  activeSortType: PropTypes.string,
  sortRanges: PropTypes.array.isRequired,
  activeSortRange: PropTypes.string
};

export default SubredditSortController;
