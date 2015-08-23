import React, { Component, PropTypes } from 'react';

class SubredditContainer extends Component {
  render() {
    return (
      <div>
        <h1>Subreddit container</h1>
        {this.props.children}
      </div>
    );
  }
}

SubredditContainer.propTypes = {
  children: PropTypes.element
};

export default SubredditContainer;
