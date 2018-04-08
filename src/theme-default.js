import getMuiTheme from 'material-ui/styles/getMuiTheme';
const ColorManipulator = require('material-ui/utils/colorManipulator');
import {
  blue600,
  grey900,
  cyan500,
  cyan700,
  lightBlack,
  pinkA200,
  grey100,
  grey500,
  darkBlack,
  white,
  grey300,
} from 'material-ui/styles/colors';

const themeDefault = getMuiTheme({
  palette: {
    // primary1Color: cyan500,
    // primary2Color: cyan700,
    // primary3Color: lightBlack,
    // accent1Color: pinkA200,
    // accent2Color: grey100,
    // accent3Color: grey500,
    // textColor: darkBlack,
    // alternateTextColor: white,
    // canvasColor: white,
    // borderColor: grey300,
    // disabledColor: ColorManipulator.fade(pinkA200, 0.3),
    // pickerHeaderColor: cyan500,
  },
  appBar: {
    height: 57,
    color: grey900
  },
  drawer: {
    width: 230,
    color: grey900
  },
  raisedButton: {
    primaryColor: grey900,
  }
});


export default themeDefault;