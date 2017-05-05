import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import thunk from 'redux-thunk';
import {AUTH_USER} from './actions/types'


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem("token");
if(token){
    store.dispatch({type: AUTH_USER})
}

import App from './components/app';
import Home from './components/home/home';
import Profile from './components/profile/profile';
import MyShelf from './components/myShelf/my_shelf';
import Search from './components/search/search_page';
import CreateCards from './components/create_cards';
import LogIn from './components/auth/log_in';
import Registration from './components/auth/registration';
import requireAuth from './components/auth/require_auth';
import Stacks from './components/stackOverview/stack_overview';
import SingleCard from './components/singleCard/single_card'

const MaterializedApp = (props) => (
    <MuiThemeProvider>
        <App/>
        {props.children}
    </MuiThemeProvider>
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route component={Home}/>
                <Route path="home" component={requireAuth(Home)}/>
                <Route path="profile" component={Profile}/>
                <Route path="myShelf" component={MyShelf}/>
                <Route path="Search" component={Search}/>
                <Route path="createCards" component={CreateCards}/>
                <IndexRoute component={LogIn}/>
                <Route path="Registration" component={Registration}/>
                <Route path="stackOverview" component={Stacks}/>
                <Route path="single_card" component={SingleCard}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
