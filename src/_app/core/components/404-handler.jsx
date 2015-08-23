import React, { Component, PropTypes } from 'react';

class NotFoundHandler extends Component {
  render() {
    return (
      <div>
        <h1>404 handler</h1>
        {this.props.children}
      </div>
    );
  }
}

NotFoundHandler.propTypes = {
  children: PropTypes.element
};

export default NotFoundHandler;
