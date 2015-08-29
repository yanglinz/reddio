import React, { Component, PropTypes } from 'react';

class SubredditListings extends Component {
  renderSubreddits() {
    return this.props.subreddits.map((subreddit) => {
      return (
        <h2 key={subreddit}>{subreddit}</h2>
      );
    });
  }

  render() {
    return (
      <div className="subreddit-listings">
        {this.renderSubreddits()}
      </div>
    );
  }
}

SubredditListings.propTypes = {
  subreddits: PropTypes.array.isRequired,
  activeSubreddit: PropTypes.string.isRequired
};

export default SubredditListings;
