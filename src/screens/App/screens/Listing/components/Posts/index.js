import _ from 'lodash';
import React from 'react';

import ListingNavigation from './ListingNavigation';
import Post from './Post';

function Posts(props) {
  const { posts } = props;
  return (
    <div>
      <ListingNavigation {...props} />
      {_.map(posts, (post, i) => (
        <Post key={i} {...props} post={post} />
      ))}
    </div>
  );
}

Posts.propTypes = {
  posts: React.PropTypes.arrayOf(React.PropTypes.shape({
    data: React.PropTypes.shape({
      id: React.PropTypes.string,
    }),
  })),
};

module.exports = Posts;
