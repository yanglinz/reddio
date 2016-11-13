import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import * as reducer from 'state/reddit/reducer';
import * as validation from './.validation';
import Post from './post';
import PostNavigation from './posts-nav';

function stateToProps(state) {
  return {
    posts: reducer.selectPosts(state),
    hotLink: reducer.selectHotLink(state),
    newLink: reducer.selectNewLink(state),
    risingLink: reducer.selectRisingLink(state),
    controversialLink: reducer.selectControversialLink(state),
  };
}

function Posts(props) {
  const { posts } = props;
  return (
    <div>
      <PostNavigation {...props} />
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

module.exports = connect(stateToProps)(Posts);
