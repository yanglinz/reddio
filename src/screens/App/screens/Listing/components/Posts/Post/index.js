import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import { playCommand } from 'state/reddit/actions';
import { isYoutube } from 'services/iframe-api/youtube';
import { isSoundcloud } from 'services/iframe-api/soundcloud';
import './index.scss';

function Post(props) {
  const { post, dispatch } = props;

  const isSelfPost = !_.isEmpty(post.data.selftext_html);
  const isPlayableSource = (
    isYoutube(post.data.url) ||
    isSoundcloud(post.data.url)
  );
  const isPlayable = !isSelfPost && isPlayableSource;

  const postClassName = classNames(
    'Post',
    { 'is-selfPost': isSelfPost },
    { 'is-playable': isPlayable },
    { 'is-unplayable': !isPlayable },
  );

  const playablePost = (
    <div className={postClassName}>
      <button onClick={() => dispatch(playCommand(post))}>play</button>
      <div>{post.data.title}</div>
    </div>
  );
  const unplayablePost = (
    <div className={postClassName}>
      <span>{post.data.title}</span>
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
