import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = (props) => (
    <MuiThemeProvider>
        {props.children}
    </MuiThemeProvider>
);

export default App;
