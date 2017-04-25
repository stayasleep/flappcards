import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxPromise from 'redux-promise'
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from './components/app';
import Registration from './components/registration';

import rootReducer from './reducers/index';

const createStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore);


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>

            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
