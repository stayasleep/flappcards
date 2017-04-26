import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxPromise from 'redux-promise'
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/app';
import Registration from './components/registration';

import rootReducer from './reducers/index';

const createStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore);

const MaterializedApp = () => (
    <MuiThemeProvider>
        <App/>
    </MuiThemeProvider>
);


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
        <Router history={browserHistory}>
            <Route path="/" component={MaterializedApp}>

            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
