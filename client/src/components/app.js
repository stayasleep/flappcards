import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    teal300, teal500,
    indigo200,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
// getMuiTheme() computes a "valid" muiTheme object
const muiTheme = getMuiTheme({
    palette: {
        textColor: fullBlack,
        primary1Color: teal300,
        primary2Color: teal500,
        primary3Color: grey400,
        accent1Color: indigo200,
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
