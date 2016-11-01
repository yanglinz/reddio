import React from 'react';
import * as action from 'reddit/action';

import * as validation from './.validation';

function Post(props) {
  const { post, dispatch } = props;
  const play = dispatch.bind(null, action.play(post));
  return (
    <div onClick={play}>
      <p>{post.data.title}</p>
    </div>
  );
}

Post.propTypes = {
  post: validation.postShape,
};

module.exports = Post;
