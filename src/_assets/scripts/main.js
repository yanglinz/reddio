var React = require('react');
var Header = require('./components/header.js');
var Footer = require('./components/footer.js');
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
        <Header/>
        <Content/>
        <Footer/>
      </div>
    );
  }
});

React.render(
  <App />,
  document.getElementById('app')
);
