import React from 'react';
import { Route } from 'react-router-dom';
import { 
    AuthRoute,
    ProtectedRoute
 } from '../util/route_util';

import SignupFormContainer from './session/signup_form_container';
import LoginFormContainer from './session/login_form_container';
import Splash from './splash/splash';
import Home from './home/home';

export default () => (
    <div>
        
        <AuthRoute path='/' exact component={Splash} />
        <ProtectedRoute path='/home' component={Home} />
        <AuthRoute path='/signup' component={SignupFormContainer} />
        <AuthRoute path='/login' component={LoginFormContainer} />

    </div>
);