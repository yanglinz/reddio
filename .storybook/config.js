/* eslint global-require: 0 */

const storybook = require('@kadira/storybook');

const context = require.context('../src', true, /\.story\.jsx?$/);

function loadStories() {
  context.keys().forEach(context);
}

storybook.configure(loadStories, module);
