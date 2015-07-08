import _ from 'lodash';
import React from 'react';
import { DropDownMenu } from 'material-ui';
import { BaseViewComponent } from '../higher-order/index.js';

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

  render() {
    let listingTypes = this.getListingTypes();
    let sortRanges = this.getSortRanges();
    return (
      <div className="listing-control">
        <DropDownMenu menuItems={listingTypes} />
        <DropDownMenu menuItems={sortRanges} />
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
