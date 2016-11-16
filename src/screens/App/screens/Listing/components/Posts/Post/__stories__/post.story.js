import _ from 'lodash';
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import 'normalize.css';

import Post from '../index';

const post = {
  isSelf: false,
  name: 't3_5dhrjy',
  numComments: 279,
  score: 2725,
  stickied: false,
  title: 'Hello wolrd',
  url: 'https://youtu.be/aa3Afg3fzAQ',
};

const nonPlayablePost = _.assign({}, post, {
  isSelf: true,
});

storiesOf('Post', module)
  .add('default', () => (
    <Post dispatch={action('dispatch')} post={post} />
  ))
  .add('non-playable', () => (
    <Post dispatch={action('dispatch')} post={nonPlayablePost} />
  ));
