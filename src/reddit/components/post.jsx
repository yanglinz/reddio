import React from 'react';
import * as action from 'reddit/action';

import * as validation from './.validation';

function Post(props) {
  const { post, dispatch } = props;
  const playPost = dispatch.bind(null, action.playPost(post));
  return (
    <div onClick={playPost}>
      <p>{post.data.title}</p>
    </div>
  );
}

Post.propTypes = {
  post: validation.postShape,
};

module.exports = Post;
