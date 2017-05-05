import React from 'react';
import {IndexRoute, Route} from 'react-router';

import App from '../components/app';
import Home from '../components/home/home';
import Profile from '../components/profile/profile';
import MyShelf from '../components/myShelf/my_shelf';
import Search from '../components/search/search_page';
import CreateCards from '../components/create_cards';
import LogIn from '../components/auth/log_in';
import Registration from '../components/auth/registration';

const routes = () => {
    return (
        <Route path="/" component={App}>
            <Route component={Home}/>
            <Route path="home" component={Home}/>
            <Route path="profile" component={Profile}/>
            <Route path="myShelf" component={MyShelf}/>
            <Route path="Search" component={Search}/>
            <Route path="createCards" component={CreateCards}/>
            <IndexRoute path="logIn" component={LogIn}/>
            <Route path="Registration" component={Registration}/>
        </Route>
    )
};

export default routes