import React, { Component, PropTypes } from 'react';

class NotFoundContainer extends Component {
  render() {
    return (
      <div>
        <h1>404 container</h1>
        {this.props.children}
      </div>
    );
  }
}

NotFoundContainer.propTypes = {
  children: PropTypes.element
};

export default NotFoundContainer;
