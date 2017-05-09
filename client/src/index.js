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
import CreateCards from './components/cardCreation/create_cards';
import LogIn from './components/auth/log_in';
import Registration from './components/auth/registration';
import requireAuth from './components/auth/require_auth';
import Stacks from './components/stackOverview/stack_overview';
import SingleCard from './components/singleCard/single_card';
import landing from './components/auth/landing_page'

const MaterializedApp = (props) => (
    <MuiThemeProvider>
        <App/>
        {props.children}
    </MuiThemeProvider>
);
console.log('  8888888888   88                     db             .d88888b.       88         88');
console.log('  88           88                    d88b          d8         8b     88         88');
console.log('  88           88                   d8  8b         88          88    88         88');
console.log('  88           88                  d8    8b         d8               88         88');
console.log('  8888888888   88                 d8      8b          "q88888b.      8888888888888');
console.log('  88           88                d8888888888b                 88b    88         88');
console.log('  88           88               d8          8b     88          88    88         88');
console.log('  88           88              d8            8b     "8        8b     88         88');
console.log('  88           8888888888888  88              88      "q8888p"       88         88');

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={landing}/>
                <Route path="home" component={requireAuth(Home)}/>
                <Route path="profile" component={requireAuth(Profile)}/>
                <Route path="myShelf" component={requireAuth(MyShelf)}/>
                <Route path="Search" component={requireAuth(Search)}/>
                <Route path="createCards" component={requireAuth(CreateCards)}/>
                <Route path="stackOverview/:sid" component={requireAuth(Stacks)}/>
                <Route path="single_card/:sid/:cid" component={requireAuth(SingleCard)}/>

            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
