import React from 'react';
import * as actions from 'reddit/actions';

import * as validation from './.validation';

function Post(props) {
  const { post, dispatch } = props;
  const playCommand = dispatch.bind(null, actions.playCommand(post));
  return (
    <div>
      <button onClick={playCommand}>play</button>
      <p>{post.data.title}</p>
    </div>
  );
}

Post.propTypes = {
  dispatch: React.PropTypes.func,
  post: validation.postShape,
};

module.exports = Post;
