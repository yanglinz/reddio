import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import 'normalize.css';

import { postFactory } from 'state/reddit/factory';
import Post from '../index';

storiesOf('Post', module)
  .add('default', () => (
    <Post dispatch={action('dispatch')} post={postFactory()} />
  ))
  .add('non-playable', () => (
    <Post dispatch={action('dispatch')} post={postFactory({ playable: false })} />
  ));
