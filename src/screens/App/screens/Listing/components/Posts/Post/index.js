import React from 'react';
import classNames from 'classnames';
import { playCommand } from 'state/reddit/actions';
import { isYoutube } from 'services/iframe-api/youtube';
import { isSoundcloud } from 'services/iframe-api/soundcloud';
import './index.scss';

function Post(props) {
  const { post, posts, dispatch } = props;

  const isPlayableSource = (
    isYoutube(post.url) ||
    isSoundcloud(post.url)
  );
  const isPlayable = !post.isSelf && isPlayableSource;

  const postClassName = classNames(
    'Post',
    { 'is-selfPost': post.isSelf },
    { 'is-playable': isPlayable },
    { 'is-unplayable': !isPlayable },
  );
  const playablePost = (
    <div className={postClassName}>
      <button onClick={() => dispatch(playCommand(post, posts))}>
        play
      </button>
      <div>{post.title}</div>
    </div>
  );
  const unplayablePost = (
    <div className={postClassName}>
      <div>{post.title}</div>
    </div>
  );

  return isPlayable
    ? playablePost
    : unplayablePost;
}

Post.propTypes = {
  dispatch: React.PropTypes.func,
  post: React.PropTypes.shape({
    data: React.PropTypes.shape({
      id: React.PropTypes.string,
    }),
  }),
};

module.exports = Post;
