import React, { Component, PropTypes } from 'react';
import { AppBar } from 'material-ui';
import Header from 'core/components/common/header.jsx';

class AppHandler extends Component {
  render() {
    return (
      <div>
        <Header title="reddio" />
        {this.props.children}
      </div>
    );
  }
}

AppHandler.propTypes = {
  children: PropTypes.element
};

export default AppHandler;
