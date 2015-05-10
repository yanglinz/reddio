'use strict';

// https://www.codementor.io/reactjs/tutorial/test-reactjs-components-karma-webpack

var context = require.context('./src/_assets/scripts', true, /-test\.js$/);
context.keys().forEach(context);
