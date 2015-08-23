import React, { Component, PropTypes } from 'react';

class AppContainer extends Component {
  render() {
    return (
      <div>
        <h1>App container</h1>
        {this.props.children}
      </div>
    );
  }
}

AppContainer.propTypes = {
  children: PropTypes.element
};

export default AppContainer;
