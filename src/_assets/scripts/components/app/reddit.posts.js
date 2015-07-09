import React from 'react';
import { Avatar, List, ListItem, RaisedButton } from 'material-ui';
import { BaseViewComponent } from '../higher-order/index.js';

class RedditPosts extends BaseViewComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="posts">
        <div className="posts-list">
          <List>
          {this.props.posts.map(function renderPosts(post) {
            let avatar = (<Avatar src={post.thumbnail} />);
            return (
              <ListItem leftAvatar={avatar}>
                <div key={post.id} className="posts">
                  {post.title}
                </div>
              </ListItem>
            );
          })}
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
