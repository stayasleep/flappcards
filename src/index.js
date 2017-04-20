import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';


import App from './components/app';
ReactDOM.render(
    <Provider >
        <Router history={browserHistory}>
            <Route path="/" component={App}>

            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
