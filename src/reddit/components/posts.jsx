import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import * as reducer from '../reducer';
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
        <Post key={i} post={post} />
      ))}
    </div>
  );
}

Posts.propTypes = {
  posts: React.PropTypes.arrayOf(validation.postShape),
};

module.exports = connect(stateToProps)(Posts);
