/* eslint react/sort-comp: 0 */

import React from 'react';
import Masthead from './base/masthead.js';
import Subreddits from './base/subreddits.js';
import ListingControl from './base/listing.control.js';
import Posts from './base/posts.js';

class Reddit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="reddit">
        <div className="masthead-wrapper wrapper">
          <Masthead />
        </div>

        <div className="subreddits-wrapper wrapper">
          <Subreddits
            activeSubreddit={this.props.activeSubreddit}
            subreddits={this.props.subreddits}
            setActiveSubreddit={this.props.setActiveSubreddit} />
        </div>

        <div className="listing-control-wrapper wrapper">
          <ListingControl
            listingTypes={this.props.listingTypes}
            sortRanges={this.props.sortRanges}
            activeListingType={this.props.activeListingType}
            activeSortRange={this.props.activeSortRange}
            setActiveListingType={this.props.setActiveListingType}
            setActiveSortRange={this.props.setActiveSortRange} />
        </div>

        <div className="posts-wrapper wrapper">
          <Posts
            posts={this.props.posts}
            fetchPosts={this.props.fetchPosts} />
        </div>
      </div>
    );
  }
}

Reddit.propTypes = {
  posts: React.PropTypes.array.isRequired,
  subreddits: React.PropTypes.array.isRequired,
  activeSubreddit: React.PropTypes.string.isRequired,
  listingTypes: React.PropTypes.array.isRequired,
  activeListingType: React.PropTypes.string.isRequired,
  sortRanges: React.PropTypes.array.isRequired,
  activeSortRange: React.PropTypes.string.isRequired,
  setActiveSubreddit: React.PropTypes.func.isRequired,
  setActiveListingType: React.PropTypes.func.isRequired,
  setActiveSortRange: React.PropTypes.func.isRequired,
  fetchPosts: React.PropTypes.func.isRequired
};

export default Reddit;
