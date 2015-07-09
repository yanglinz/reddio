import React, { Component } from 'react';
import mui from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();  // get touch events to work for mui
let Colors = mui.Styles.Colors;

const CustomMaterialPalette = {
  primary1Color: Colors.blue700,
  primary2Color: Colors.cyan700,
  primary3Color: Colors.cyan100,
  accent1Color: Colors.pinkA200,
  accent2Color: Colors.pinkA400,
  accent3Color: Colors.pinkA100,
  textColor: Colors.darkBlack,
  canvasColor: Colors.white,
  borderColor: Colors.grey300
};

const CustomMaterialComponentThemes = {
  raisedButton: {
    primaryColor: Colors.blue700
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
