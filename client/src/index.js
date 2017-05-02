import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import async from './middleware/async';
import reduxPromise from 'redux-promise'; // Does not like objects?

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import rootReducer from './reducers/index';

const createStoreWithMiddleware = applyMiddleware(async)(createStore);

import App from './components/app';
import Home from './components/home';
import Profile from './components/profile';
import MyShelf from './components/my_shelf';
import Search from './components/search_page';
import CreateCards from './components/create_cards';
import LogIn from './components/auth/log_in';
import Registration from './components/auth/registration';
import requireAuth from './components/auth/require_auth';

const MaterializedApp = (props) => (
    <MuiThemeProvider>
        <App/>
        {props.children}
    </MuiThemeProvider>
);


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route component={Home}/>
                <Route path="home" component={requireAuth(Home)}/>
                <Route path="profile" component={requireAuth(Profile)}/>
                <Route path="myShelf" component={requireAuth(MyShelf)}/>
                <Route path="Search" component={requireAuth(Search)}/>
                <Route path="createCards" component={requireAuth(CreateCards)}/>
                <IndexRoute component={LogIn}/>
                <Route path="Registration" component={Registration}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
