/* eslint global-require: 0 */

const storybook = require('@kadira/storybook');

function loadStories() {
  require('../src/core/components/.storybook/footer.story.jsx');
}

storybook.configure(loadStories, module);
