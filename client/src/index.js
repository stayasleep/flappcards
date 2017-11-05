import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, IndexRoute, browserHistory, Redirect} from 'react-router';
import thunk from 'redux-thunk';
import {AUTH_USER} from './actions/types'


import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem("token");
const guest = localStorage.getItem("guest");
// console.log = function() {};
if(token && JSON.parse(guest)){
    store.dispatch({type: AUTH_USER,payload: false});
} else if(token ){
    store.dispatch({type: AUTH_USER, payload: true});
}

import App from './components/app';
import Home from './containers/home/home';
import Profile from './components/profile/profile';
import MyShelf from './containers/myshelf/myshelf';
import Search from './components/search/search_page';
import CreateCards from './components/cardCreation/create_cards';
import requireAuth from './components/auth/require_auth';
import Stacks from './containers/stackoverview/stackoverview';

import SingleCard from './components/singleCard/single_card';
import Landing from './containers/landing_page/landing';
import About from './containers/about/about';
import PrivacyPolicy from './containers/privacy/privacy';
import Disclaimer from './containers/disclaimer/disclaimer';
import Error404 from './components/errors/404';
import Reset from './components/auth/reset';
// import SignIn from './components/login/login';
import Login from './containers/login_page/login';
import Register from './components/register/register';
// import Forgot from './components/recover_password/forgot';
import Forgot from './containers/forgot_pw_page/forgot_pw';



ReactDOM.render(
    <Provider store={store}>
        <Router onUpdate={ () => window.scroll(0, 0)} history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Landing}/>
                <Route path="home" component={requireAuth(Home)}/>
                <Route path="login" component={Login}/>
                <Route path="login/forgotpassword" component={Forgot} />
                <Router path="register" component={Register}/>
                <Route path="profile" component={requireAuth(Profile)}/>
                <Route path="myShelf" component={requireAuth(MyShelf)}/>
                <Route path="Search" component={requireAuth(Search)} />
                <Route path="createCards" component={requireAuth(CreateCards)}/>
                <Route path="stackOverview/:sid" component={requireAuth(Stacks)}/>
                <Route path="stackOverview/:sid/:cid" component={requireAuth(SingleCard)}/>
                <Route path="about" component={About}/>
                <Route path="disclaimer" component={Disclaimer}/>
                <Route path="privacy" component={PrivacyPolicy}/>
                <Route path="reset/:token" component={Reset}/>
                <Redirect from="signin" to="/login" />
                <Redirect from="logout" to="/"/>
                <Route path="*" component={Error404}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
