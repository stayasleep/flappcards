import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MyShelf from './my_shelf';
import CreateCards from './create_cards';
import Search from './search_page'
import LogIn from './auth/log_in'
import Home from './home'
import Stacks from './stack_overview'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = (props) => (
    <MuiThemeProvider>
        {props.children}
    </MuiThemeProvider>
);

export default App;
