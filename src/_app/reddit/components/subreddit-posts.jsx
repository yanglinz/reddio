import { isEmpty, isEqual, last, map, unescape } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Avatar, FontIcon, IconButton, List, ListItem, RaisedButton } from 'material-ui';
import materialUI from 'core/components/decorators/material-ui.js';
import { fetchPosts } from 'reddit/state/actions.js';
import { setActiveSong, setSongs } from 'player/state/actions.js';
import './subreddit-posts.css';

@materialUI
class RedditPosts extends Component {
  componentDidUpdate(prevProps) {
    const { dispatch, posts } = this.props;
    const hasNewPosts = !isEqual(prevProps.posts, posts);
    if (hasNewPosts) {
      dispatch(setSongs(posts));
    }
  }

  handleClickPost(post) {
    const { dispatch, posts } = this.props;
    dispatch(setActiveSong(post));
    dispatch(setSongs(posts));
  }

  handleFetchPosts() {
    const { dispatch, activeSubreddit, activeSortType, activeSortRange, posts } = this.props;
    const lastPost = last(posts) || {};
    dispatch(fetchPosts(activeSubreddit, activeSortType, activeSortRange, {
      after: lastPost.name
    }));
  }

  renderPosts() {
    const { posts } = this.props;
    return map(posts, (post) => {
      const thumbnail = (
        <Avatar src={post.thumbnail} />
      );
      const playButton = (
        <IconButton>
          <FontIcon className="material-icons">play_circle_filled</FontIcon>
        </IconButton>
      );
      const primaryText = (
        <div className="post-title">
          {unescape(post.title)}
        </div>
      );
      const secondaryText = (
        <div className="post-info">
          {post.createdUtcHuman} | {post.score} points | {post.domain}
        </div>
      );
      return (
        <div
          className="post"
          key={post.id}
          onClick={this.handleClickPost.bind(this, post)}>
          <ListItem
            leftAvatar={thumbnail}
            rightIconButton={playButton}
            primaryText={primaryText}
            secondaryText={secondaryText} />
        </div>
      );
    });
  }

  renderLoader() {
    const { isFetching } = this.props;
    if (isFetching) {
      return null;
    }
    return (
      <div className="posts-loader">
        <div onClick={this.handleFetchPosts.bind(this)}>
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
      <div className="subreddit-posts">
        {subredditPosts}
        {this.renderLoader()}
      </div>
    );
  }
}

RedditPosts.propTypes = {
  dispatch: PropTypes.func,
  isFetching: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired,
  activeSubreddit: PropTypes.string,
  activeSortType: PropTypes.string,
  activeSortRange: PropTypes.string
};

export default RedditPosts;
