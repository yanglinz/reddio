/* eslint react/sort-comp: 0 */

import React, { Component } from 'react';
import RedditSubreddits from './reddit.subreddits.js';
import RedditControl from './reddit.control.js';
import RedditPosts from './reddit.posts.js';
import Sidebar from './sidebar.js';

class Reddit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="reddit">
        <aside>
          <RedditSubreddits
            activeSubreddit={this.props.activeSubreddit}
            subreddits={this.props.subreddits}
            onActiveSubredditChange={this.props.onActiveSubredditChange} />
        </aside>

        <main>
          <RedditControl
            listingTypes={this.props.listingTypes}
            sortRanges={this.props.sortRanges}
            activeListingType={this.props.activeListingType}
            activeSortRange={this.props.activeSortRange}
            setActiveListingType={this.props.setActiveListingType}
            setActiveSortRange={this.props.setActiveSortRange} />

          <RedditPosts
            posts={this.props.posts}
            fetchPosts={this.props.fetchPosts} />
        </main>

        <aside>
          <Sidebar />
        </aside>
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
  onActiveSubredditChange: React.PropTypes.func.isRequired,
  setActiveListingType: React.PropTypes.func.isRequired,
  setActiveSortRange: React.PropTypes.func.isRequired,
  fetchPosts: React.PropTypes.func.isRequired
};

export default Reddit;
