import React from 'react';
import { List, ListItem } from 'material-ui';
import { BaseViewComponent } from '../higher-order/index.js';

class RedditSubreddits extends BaseViewComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="subreddits">
        <List subheader="Subreddits">
          {this.props.subreddits.map(function renderSubreddits(subreddit) {
            const isActive = subreddit === this.props.activeSubreddit;
            return (
              <ListItem key={subreddit}>
                {subreddit}
              </ListItem>
            );
          }.bind(this))}
        </List>
      </div>
    );
  }
}

RedditSubreddits.propTypes = {
  activeSubreddit: React.PropTypes.string.isRequired,
  subreddits: React.PropTypes.array.isRequired,
  setActiveSubreddit: React.PropTypes.func.isRequired
};

export default RedditSubreddits;
