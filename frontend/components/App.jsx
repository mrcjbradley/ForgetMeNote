import React from 'react';
import { Route } from 'react-router-dom';
import { 
    AuthRoute,
    Protected
 } from '../util/route_util';

import SignupFormContainer from './session/signup_form_container';
import LoginFormContainer from './session/login_form_container';

export default () => (
    <div>
        <header>
            <h1>Evernote</h1>
        </header>
        <AuthRoute path='/signup' component={SignupFormContainer} />
        <AuthRoute path='/login' component={LoginFormContainer} />

    </div>
);