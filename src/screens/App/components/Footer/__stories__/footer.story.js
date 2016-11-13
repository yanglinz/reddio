import React from 'react';
import { storiesOf } from '@kadira/storybook';
import 'normalize.css';

import Footer from '../index';

storiesOf('Footer', module)
  .add('default', () => (
    <Footer />
  ));
