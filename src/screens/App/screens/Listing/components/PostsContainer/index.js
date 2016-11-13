import React from 'react';
import { connect } from 'react-redux';

import * as reducer from 'state/reddit/reducer';
import Posts from '../Posts';

function stateToProps(state) {
  return {
    posts: reducer.selectPosts(state),
    hotLink: reducer.selectHotLink(state),
    newLink: reducer.selectNewLink(state),
    risingLink: reducer.selectRisingLink(state),
    controversialLink: reducer.selectControversialLink(state),
  };
}

function PostsContainer(props) {
  return (
    <div className="PostsContainer">
      <Posts {...props} />
    </div>
  );
}

PostsContainer.propTypes = {
  posts: React.PropTypes.arrayOf(React.PropTypes.shape({
    data: React.PropTypes.shape({
      id: React.PropTypes.string,
    }),
  })),
};

module.exports = connect(stateToProps)(PostsContainer);
