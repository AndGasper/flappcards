import React from 'react';
import {IndexRoute, Route} from 'react-router';

import App from '../components/app';
import Home from '../components/home';
import Profile from '../components/profile';
import MyShelf from '../components/my_shelf';
import Search from '../components/search_page';
import CreateCards from '../components/create_cards';
import LogIn from '../components/log_in';
import Registration from '../components/registration';

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