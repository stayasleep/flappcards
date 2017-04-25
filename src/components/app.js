import React from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Registration from './registration';

const App = (props) => (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Registration/>
    </MuiThemeProvider>
);

export default App;
