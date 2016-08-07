/* eslint global-require: 0 */

const storybook = require('@kadira/storybook');

function loadStories() {
  require('../../src/core/components/__stories__/core-stories');
}

storybook.configure(loadStories, module);
