import React from 'react';
import { FontIcon, IconButton, List, ListItem } from 'material-ui';
import { BaseViewComponent } from '../wrappers/index.js';

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
            let subredditIcon = (
              <IconButton>
                <FontIcon className="material-icons">headset</FontIcon>
              </IconButton>
            );
            return (
              <div
                key={subreddit}
                onClick={this.props.onActiveSubredditChange}
                data-payload={subreddit}>
                <ListItem
                  rightIconButton={subredditIcon}>
                  {subreddit}
                </ListItem>
              </div>
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
  onActiveSubredditChange: React.PropTypes.func.isRequired
};

export default RedditSubreddits;
