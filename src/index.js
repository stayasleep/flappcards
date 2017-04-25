import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/app';

const MaterializedApp = () => (
    <MuiThemeProvider>
        <App/>
    </MuiThemeProvider>
);


ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={MaterializedApp}>

            </Route>
        </Router>,
    document.getElementById('root')
);
