import React from 'react';
import { playCommand } from 'state/reddit/actions';

import * as validation from './.validation';

function Post(props) {
  const { post, dispatch } = props;
  return (
    <div>
      <button onClick={() => dispatch(playCommand(post))}>play</button>
      <p>{post.data.title}</p>
    </div>
  );
}

Post.propTypes = {
  dispatch: React.PropTypes.func,
  post: React.PropTypes.shape({
    data: React.PropTypes.shape({
      id: React.PropTypes.string
    })
  }),
};

module.exports = Post;
