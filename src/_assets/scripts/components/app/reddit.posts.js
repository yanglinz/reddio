import React from 'react';

class RedditPosts extends React.Component {
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
          {this.props.posts.map(function renderPosts(post) {
            return (
              <div key={post.id} className="posts">
                <p>{post.title}</p>
              </div>
            );
          })}

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
