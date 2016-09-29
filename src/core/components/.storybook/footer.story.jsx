import React from 'react';
import { storiesOf } from '@kadira/storybook';
import 'normalize.css';

import Footer from '../footer.jsx';

storiesOf('Footer', module)
  .add('default', () => (
    <Footer />
  ));
