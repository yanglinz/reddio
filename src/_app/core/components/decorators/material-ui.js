import { extend } from 'lodash';
import { PropTypes } from 'react';
import { Styles } from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();  // get touch events to work for mui

const { ThemeManager, LightRawTheme, Colors } = Styles;
const CustomLightTheme = extend({}, LightRawTheme, {
  palette: {
    primary1Color: Colors.blue600,
    primary2Color: Colors.blue700,
    primary3Color: Colors.lightBlack,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: Colors.grey300
  }
});

function materialUI(TargetComponent) {
  class Decorated extends TargetComponent {
    getChildContext() {
      return {
        muiTheme: ThemeManager.getMuiTheme(CustomLightTheme)
      };
    }
  }

  Decorated.childContextTypes = {
    muiTheme: PropTypes.object
  };

  return Decorated;
}

export default materialUI;
