import React, { Component } from 'react';
import mui, { Styles } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();  // get touch events to work for mui

const CustomMaterialPalette = {
  primary1Color: Styles.Colors.blue700,
  primary2Color: Styles.Colors.cyan700,
  primary3Color: Styles.Colors.cyan100,
  accent1Color: Styles.Colors.pinkA200,
  accent2Color: Styles.Colors.pinkA400,
  accent3Color: Styles.Colors.pinkA100,
  textColor: Styles.Colors.darkBlack,
  canvasColor: Styles.Colors.white,
  borderColor: Styles.Colors.grey300
};

const CustomMaterialComponentThemes = {
  raisedButton: {
    primaryColor: Styles.Colors.blue700
  }
};

let ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setPalette(CustomMaterialPalette);
ThemeManager.setComponentThemes(CustomMaterialComponentThemes);

class MaterialDesignWrapper extends Component {
  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }
}

MaterialDesignWrapper.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default MaterialDesignWrapper;
