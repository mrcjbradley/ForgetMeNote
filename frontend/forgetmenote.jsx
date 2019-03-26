import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
//TESTING!!!
import * as SessAPIUtil from './util/session_api_util';
//END TESTING!!!

document.addEventListener('DOMContentLoaded', () => {
    const store = configureStore();
    const root = document.getElementById('root');

    //TESTING!!!
        window.createUser = SessAPIUtil.createUser;
        window.logIn = SessAPIUtil.logIn;
        window.logOut = SessAPIUtil.logOut;
        window.validateEmail = SessAPIUtil.validateEmail;
        window.getState = store.getState;
        window.dispatch = store.dispatch;

    //END TESTING!!!

    ReactDOM.render( <Root store={store} />, root);
});