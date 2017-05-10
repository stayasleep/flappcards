import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// getMuiTheme() computes a "valid" muiTheme object
const muiTheme = getMuiTheme({lightBaseTheme}); // Does not seem necessary
const App = (props) => (
    <MuiThemeProvider muiTheme={muiTheme}>
        {props.children}
    </MuiThemeProvider>
);

export default App;
