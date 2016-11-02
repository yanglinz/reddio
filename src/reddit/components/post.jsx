import React from 'react';
import * as action from 'reddit/action';

import * as validation from './.validation';

function Post(props) {
  const { post, dispatch } = props;
  const playPost = dispatch.bind(null, action.playPost(post));
  return (
    <div>
      <button onClick={playPost}>play</button>
      <p>{post.data.title}</p>
    </div>
  );
}

Post.propTypes = {
  dispatch: React.PropTypes.func,
  post: validation.postShape,
};

module.exports = Post;
