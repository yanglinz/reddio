var React = require('react');

var Header = React.createClass({
  render: function () {
    return (
      <div className="header">
        <div className="wrap">
          <div className="brand">
            <h1 className="site-title">Reddio</h1>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Header;
