import React from 'react';

class ListingControl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="listing-control">
        <div className="listing-types">
          {this.props.listingTypes.map(function renderlistingTypes(sortType) {
            const isActive = sortType === this.props.activeListingType;
            return (
              <p
                key={sortType}
                className={isActive ? 'active' : ''}
                onClick={this.props.setActiveListingType}
                data-value={sortType}>
                {sortType}
              </p>
            );
          }.bind(this))}
        </div>

        <div className="sort-ranges">
          {this.props.sortRanges.map(function renderSortRanges(sortRange) {
            const isActive = sortRange === this.props.activeSortRange;
            return (
              <p
                key={sortRange}
                className={isActive ? 'active' : ''}
                onClick={this.props.setActiveSortRange}
                data-value={sortRange}>
                {sortRange}
              </p>
            );
          }.bind(this))}
        </div>
      </div>
    );
  }
}

ListingControl.propTypes = {
  listingTypes: React.PropTypes.array.isRequired,
  sortRanges: React.PropTypes.array.isRequired,
  activeListingType: React.PropTypes.string.isRequired,
  activeSortRange: React.PropTypes.string.isRequired,
  setActiveListingType: React.PropTypes.func.isRequired,
  setActiveSortRange: React.PropTypes.func.isRequired
};

export default ListingControl;
