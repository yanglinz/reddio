import { map } from 'lodash';
import React, { Component } from 'react';
import { Avatar, FontIcon, IconButton, List, ListItem, RaisedButton } from 'material-ui';
import materialUI from 'core/components/decorators/material-ui.js';

@materialUI
class RedditPosts extends Component {
  renderPosts() {
    return map(this.props.posts, (post) => {
      const thumbnail = (
        <Avatar src={post.thumbnail} />
      );
      let playButton = (
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

  render() {
    return (
      <div className="posts-list">
        <List>
          {this.renderPosts()}
        </List>
      </div>
    );
  }
}

RedditPosts.propTypes = {
  posts: React.PropTypes.array.isRequired
};

export default RedditPosts;
