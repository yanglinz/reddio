import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import 'normalize.css';

import Controls from '../index';

const commands = {
  pauseCommand: action('pauseCommand'),
};

storiesOf('Controls', module)
  .add('default', () => (
    <Controls {...commands} />
  ))
  .add('playing', () => (
    <Controls isPlaying {...commands} />
  ));
