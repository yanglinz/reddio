import React from 'react';
import { Avatar, List, ListItem } from 'material-ui';
import { BaseViewComponent } from '../higher-order/index.js';

class RedditPosts extends BaseViewComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="posts">
        <div className="posts-fetch">
          <p onClick={this.props.fetchPosts}>Fetch posts</p>
        </div>

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
      </div>
    );
  }
}

RedditPosts.propTypes = {
  posts: React.PropTypes.array.isRequired,
  fetchPosts: React.PropTypes.func.isRequired
};

export default RedditPosts;
