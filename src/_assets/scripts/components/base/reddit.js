/* eslint react/sort-comp: 0 */

import React from 'react';

class Reddit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='reddit'>
        <div className='reddit-control'>
          <p onClick={this.props.setActiveSubreddit} data-subreddit='listentothis'>Set active subreddit</p>
          <p onClick={this.props.setActiveSortType}>Set active sort type</p>
          <p onClick={this.props.fetchPosts}>Fetch posts</p>
        </div>
      </div>
    );
  }
}

Reddit.propTypes = {
  subreddits: React.PropTypes.array.isRequired,
  sortTypes: React.PropTypes.array.isRequired,
  setActiveSubreddit: React.PropTypes.func.isRequired,
  setActiveSortType: React.PropTypes.func.isRequired,
  fetchPosts: React.PropTypes.func.isRequired
};

export default Reddit;
