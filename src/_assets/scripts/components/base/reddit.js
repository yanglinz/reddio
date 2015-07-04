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
              return (
                <p
                  key={subreddit}
                  onClick={this.props.setActiveSubreddit}
                  data-value={subreddit}>
                  {subreddit}
                </p>
              );
            }.bind(this))}
          </div>

          <div className="sort-types">
            {this.props.listingTypes.map(function renderlistingTypes(sortType) {
              return (
                <p
                  key={sortType}
                  onClick={this.props.setActiveSortType}
                  data-value={sortType}>
                  {sortType}
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
            }.bind(this))}
          </div>
        </div>
      </div>
    );
  }
}

Reddit.propTypes = {
  posts: React.PropTypes.array.isRequired,
  subreddits: React.PropTypes.array.isRequired,
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
