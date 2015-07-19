import _ from 'lodash';
import React from 'react';
import { DropDownMenu } from 'material-ui';
import { BaseViewComponent } from '../../core/views/index.js';

class RedditControl extends BaseViewComponent {
  constructor(props) {
    super(props);
  }

  getListingTypes() {
    return _.map(this.props.listingTypes, sortType => ({
      payload: sortType,
      text: sortType
    }));
  }

  getSortRanges() {
    return _.map(this.props.sortRanges, sortRange => ({
      payload: sortRange,
      text: sortRange
    }));
  }

  onListingTypeChange(e, selectedIndex, menuItem) {
    const payload = menuItem.payload;
    if (payload) {
      this.props.setActiveListingType(payload);
    }
  }

  onSortRangeChange(e, selectedIndex, menuItem) {
    const payload = menuItem.payload;
    if (payload) {
      this.props.setActiveSortRange(payload);
    }
  }

  render() {
    let listingTypes = this.getListingTypes();
    let activeListingTypeIndex = _.indexOf(this.props.listingTypes, this.props.activeListingType);
    let sortRanges = this.getSortRanges();
    let activeSortRangeIndex = _.indexOf(this.props.sortRanges, this.props.activeSortRange);
    return (
      <div className="listing-control">
        <DropDownMenu
          menuItems={listingTypes}
          selectedIndex={activeListingTypeIndex}
          onChange={this.onListingTypeChange.bind(this)} />
        <DropDownMenu
          menuItems={sortRanges}
          selectedIndex={activeSortRangeIndex}
          onChange={this.onSortRangeChange.bind(this)} />
      </div>
    );
  }
}

RedditControl.propTypes = {
  listingTypes: React.PropTypes.array.isRequired,
  sortRanges: React.PropTypes.array.isRequired,
  activeListingType: React.PropTypes.string.isRequired,
  activeSortRange: React.PropTypes.string.isRequired,
  setActiveListingType: React.PropTypes.func.isRequired,
  setActiveSortRange: React.PropTypes.func.isRequired
};

export default RedditControl;
