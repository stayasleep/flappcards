import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxPromise from 'redux-promise'
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/app';

import rootReducer from './reducers/index';

const createStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore);

import Home from './components/home';
import Profile from './components/profile';
import MyShelf from './components/my_shelf';
import Search from './components/search_page';
import CreateCards from './components/create_cards';
import LogIn from './components/log_in';
import Registration from './components/registration';

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
                <Route path="home" component={Home}/>
                <Route path="profile" component={Profile}/>
                <Route path="myShelf" component={MyShelf}/>
                <Route path="Search" component={Search}/>
                <Route path="createCards" component={CreateCards}/>
                <Route path="logIn" component={LogIn}/>
                <Route path="Registration" component={Registration}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
