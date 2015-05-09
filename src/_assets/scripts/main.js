/*

var React = require('react');
var Songs = require('./components/songsList.js');

React.render(
  <Songs />,
  document.getElementById('app')
);

*/

var reddit = require('./lib/reddit/reddit.js');
var req = reddit.listenToThis.getHot();
req.then(function (data) { console.log('data', data); });
