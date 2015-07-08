import mui, { AppBar } from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;

let CustomPalette = {
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

ThemeManager.setPalette(CustomPalette);

export default ThemeManager;
