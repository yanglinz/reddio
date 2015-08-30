import { map } from 'lodash';
import React, { PropTypes } from 'react';
import RouterComponent from 'core/components/higher-order/router.jsx';
import { FontIcon, IconButton, List, ListItem } from 'material-ui';
import materialUI from 'core/components/decorators/material-ui.js';

@materialUI
class SubredditListings extends RouterComponent {
  handleChangeSubreddit(subreddit) {
    if (subreddit !== this.props.activeSubreddit) {
      const newRoute = `r/${subreddit}`;
      this.transitionTo(newRoute);
    }
  }

  renderSubreddits() {
    return map(this.props.subreddits, (subreddit) => {
      const subredditIcon = (
        <IconButton>
          <FontIcon className="material-icons">headset</FontIcon>
        </IconButton>
      );
      return (
        <div
          key={subreddit}
          onClick={this.handleChangeSubreddit.bind(this, subreddit)}>
          <ListItem rightIconButton={subredditIcon}>
            {subreddit}
          </ListItem>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="subreddit-listings">
        <List subheader="Subreddits">
          {this.renderSubreddits()}
        </List>
      </div>
    );
  }
}

SubredditListings.propTypes = {
  subreddits: PropTypes.array.isRequired,
  activeSubreddit: PropTypes.string.isRequired
};

export default SubredditListings;
