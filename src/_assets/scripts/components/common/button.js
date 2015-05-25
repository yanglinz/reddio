'use strict';

var React = require('react');

var Button = React.createClass({
  render: function () {
    return (
      <div className="btn">
        <a>{this.props.children}</a>
      </div>
    );
  }
});

module.exports = Button;
