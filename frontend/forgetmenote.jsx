import React from 'react';
import configureStore from './store/store';
import ReactDOM from 'react-dom';
import Root from './components/root';
//TESTING!!!
import * as SessAPIUtil from './util/session_api_util';
import {
    signUp,
    logIn,
    logOut
} from './actions/session_actions';
//END TESTING!!!

document.addEventListener('DOMContentLoaded', () => {
    let store;
    if (window.unforgotten.user) {
        debugger

        const preloadedState = { session: { currentUser: window.unforgotten.user } }; 
        store = configureStore(preloadedState);
        // delete window.currentUser; 
    } else {
            store = configureStore();
    }
    
    const root = document.getElementById('root');

    //TESTING!!!
        // window.signUp = SessAPIUtil.signUp;
        // window.logIn = SessAPIUtil.logIn;
        // window.logOut = SessAPIUtil.logOut;
        window.validateEmail = SessAPIUtil.validateEmail;
        window.signUp = signUp;
        window.logIn = logIn;
        window.logOut = logOut;
        window.getState = store.getState;
        window.dispatch = store.dispatch;

    //END TESTING!!!

 

    ReactDOM.render( <Root store={store} />, root);
});