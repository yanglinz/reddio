import React from 'react';

import * as validation from './.validation';

function Post(props) {
  const { post } = props;
  return (
    <div>
      <p>{post.data.title}</p>
    </div>
  );
}

Post.propTypes = {
  post: validation.postShape
};

module.exports = Post;
