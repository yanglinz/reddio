import React from 'react';
import { Avatar, FontIcon, IconButton, List, ListItem, RaisedButton } from 'material-ui';
import RedditActions from '../actions.js';
import dispatcher from '../../core/dispatcher.js';
import { BaseViewComponent } from '../../core/views/index.js';

class RedditPosts extends BaseViewComponent {
  constructor(props) {
    super(props);
  }

  setQueue() {
    let song = this;
    let action = RedditActions.setQueue(song);
    dispatcher.dispatch(action);
  }

  render() {
    return (
      <div className="posts">
        <div className="posts-list">
          <List>

          {this.props.posts.map(function renderPosts(post) {
            let thumbnail = (
              <Avatar src={post.thumbnail} />
            );
            let playButton = (
              <IconButton>
                <FontIcon className="material-icons">play_circle_filled</FontIcon>
              </IconButton>
            );
            return (
              <div
                key={post.id}
                className="post"
                onClick={this.setQueue.bind(post)}>
                <ListItem
                  leftAvatar={thumbnail}
                  rightIconButton={playButton}>
                  <div className="posts">
                    {post.title}
                  </div>
                </ListItem>
              </div>
            );
          }.bind(this))}

          </List>
        </div>

        <div className="posts-fetch">
          <RaisedButton
            onClick={this.props.fetchPosts}
            primary={true}
            label="Load more" />
        </div>
      </div>
    );
  }
}

RedditPosts.propTypes = {
  posts: React.PropTypes.array.isRequired,
  fetchPosts: React.PropTypes.func.isRequired
};

export default RedditPosts;
