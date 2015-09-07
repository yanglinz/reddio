import { isEmpty, map } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Avatar, FontIcon, IconButton, List, ListItem, RaisedButton } from 'material-ui';
import materialUI from 'core/components/decorators/material-ui.js';

@materialUI
class RedditPosts extends Component {
  renderPosts() {
    return map(this.props.posts, (post) => {
      const thumbnail = (
        <Avatar src={post.thumbnail} />
      );
      const playButton = (
        <IconButton>
          <FontIcon className="material-icons">play_circle_filled</FontIcon>
        </IconButton>
      );
      return (
        <div key={post.id}>
          <ListItem
            leftAvatar={thumbnail}
            rightIconButton={playButton}>
            <div className="posts">
              {post.title}
            </div>
          </ListItem>
        </div>
      );
    });
  }

  renderLoader() {
    if (this.props.isFetching) {
      return null;
    }
    return (
      <div className="posts-list__loader">
        <RaisedButton label="Load more" />
      </div>
    );
  }

  renderActiveState() {
    return (
      <List>
        {this.renderPosts()}
      </List>
    );
  }

  renderInactiveState() {
    return (
      <div className="empty"></div>
    );
  }

  render() {
    const subredditPosts = isEmpty(this.props.posts) ?
      this.renderInactiveState() :
      this.renderActiveState();
    return (
      <div className="posts-list">
        {subredditPosts}
        {this.renderLoader()}
      </div>
    );
  }
}

RedditPosts.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired
};

export default RedditPosts;
