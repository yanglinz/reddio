import React from 'react';
import mui, { AppBar } from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();

class AppBarWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  render() {
    return (
      <AppBar title={this.props.title} />
    );
  }
}

AppBarWrapper.propTypes = {
  title: React.PropTypes.string.isRequired
};

AppBarWrapper.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default AppBarWrapper;
