import React, { Component, PropTypes } from 'react';
import { AppBar } from 'material-ui';
import materialUI from 'core/components/decorators/material-ui.js';
import './app.css';

@materialUI
class AppContainer extends Component {
  render() {
    return (
      <div>
        <AppBar title="reddio" />
        {this.props.children}
      </div>
    );
  }
}

AppContainer.propTypes = {
  children: PropTypes.element
};

export default AppContainer;
