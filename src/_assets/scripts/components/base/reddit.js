/* eslint react/sort-comp: 0 */

import React from 'react';

class Reddit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="reddit">
        <div className="reddit-control">
          <div className="subreddits">
            {this.props.subreddits.map(function renderSubreddits(subreddit) {
              const isActive = subreddit === this.props.activeSubreddit;
              return (
                <p
                  key={subreddit}
                  className={isActive ? 'active' : ''}
                  onClick={this.props.setActiveSubreddit}
                  data-value={subreddit}>
                  {subreddit}
                </p>
              );
            }.bind(this))}
          </div>

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

          <p onClick={this.props.fetchPosts}>Fetch posts</p>

          <div className="posts">
            {this.props.posts.map(function renderPosts(post) {
              return (
                <div key={post.id} className="posts">
                  <p>{post.title}</p>
                </div>
              );
            })}

          </div>
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
