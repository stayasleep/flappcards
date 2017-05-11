import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    teal300, teal500,
    indigo200,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
// getMuiTheme() computes a "valid" muiTheme object
const muiTheme = getMuiTheme({
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    margin: "1em auto",
    palette: {
        primary1Color: teal300,
        primary2Color: teal500,
        primary3Color: grey400,
        accent1Color: indigo200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: fullBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: teal300,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    }
});
const App = (props) => (
    <MuiThemeProvider muiTheme={muiTheme}>
        {props.children}
    </MuiThemeProvider>
);

export default App;
