import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    indigo500, indigo700, cyan700,
    pinkA200,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
// getMuiTheme() computes a "valid" muiTheme object
const muiTheme = getMuiTheme({
    palette: {
        textColor: indigo500,
        primary1Color: indigo500,
        primary2Color: indigo700,
        primary3Color: grey400,
        accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
    }
});
const App = (props) => (
    <MuiThemeProvider muiTheme={muiTheme}>
        {props.children}
    </MuiThemeProvider>
);

export default App;
