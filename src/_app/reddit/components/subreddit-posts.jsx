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
    const { isFetching, activeSubreddit, activeSortType, activeSortRange, posts } = this.props;
    if (isFetching) {
      return null;
    }
    return (
      <div className="posts-list__loader">
        <div
          onClick={() => {
            this.props.handleFetchPosts(activeSubreddit, activeSortType, activeSortRange, posts);
          }}>
          <RaisedButton label="Load more" />
        </div>
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
  posts: PropTypes.array.isRequired,
  activeSubreddit: PropTypes.string,
  activeSortType: PropTypes.string,
  activeSortRange: PropTypes.string,
  handleFetchPosts: PropTypes.func
};

export default RedditPosts;
