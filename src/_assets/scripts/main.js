var React = require('react');
var Masthead = require('./components/masthead.js');
var Songs = require('./components/songsList.js');

var Content = React.createClass({
  render: function () {
    return (
      <div className="content">
        <div className="wrap">
          <Songs/>
        </div>
      </div>
    );
  }
});

var App = React.createClass({
  render: function () {
    return (
      <div className="wrap">
        <Masthead/>
        <Content/>
      </div>
    );
  }
});

React.render(
  <App />,
  document.getElementById('app')
);
