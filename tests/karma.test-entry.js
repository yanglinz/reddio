// load all tests to avoid creating a webpack bundle for each test

var context = require.context('../src', true, /-test\.js$/);
context.keys().forEach(context);
