import React from 'react';

class Subreddits extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
    );
  }
}

Subreddits.propTypes = {
  activeSubreddit: React.PropTypes.string.isRequired,
  subreddits: React.PropTypes.array.isRequired,
  setActiveSubreddit: React.PropTypes.func.isRequired
};

export default Subreddits;
