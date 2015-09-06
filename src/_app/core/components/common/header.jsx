import React, { Component, PropTypes } from 'react';
import { AppBar } from 'material-ui';
import materialUI from 'core/components/decorators/material-ui.js';

@materialUI
class Header extends Component {
  render() {
    return (
      <AppBar title={this.props.title} />
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
