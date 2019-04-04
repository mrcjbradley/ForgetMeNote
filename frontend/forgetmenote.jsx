import React from 'react';
import configureStore from './store/store';
import ReactDOM from 'react-dom';
import Root from './components/root';
//TESTING!!!
// import * as SessAPIUtil from './util/session_api_util';
// import {
//     signUp,
//     logIn,
//     logOut
// } from './actions/session_actions';
import {
    getAllNotes,
    getNote,
    patchNote,
    deleteNote,
    postNote
} from './actions/note_actions';
//END TESTING!!!

document.addEventListener('DOMContentLoaded', () => {
    let store;
    if (window.currentUser) {
        const preloadedState = { session: { currentUser: window.currentUser.user }, ui: { recentNotes:  window.currentUser.recentNotes  } }; 
        store = configureStore(preloadedState);
        delete window.currentUser; 
    } else {
            store = configureStore();
    }
    
    const root = document.getElementById('root');

    //TESTING!!!
        // window.signUp = SessAPIUtil.signUp;
        // window.logIn = SessAPIUtil.logIn;
        // window.logOut = SessAPIUtil.logOut;
        // window.validateEmail = SessAPIUtil.validateEmail;
        // window.signUp = signUp;
        // window.logIn = logIn;
        // window.logOut = logOut;
        window.getState = store.getState;
        window.dispatch = store.dispatch;
        window.getAllNotes = getAllNotes;
        window.getNote = getNote;
        window.patchNote = patchNote;
        window.deleteNote = deleteNote;
        window.postNote = postNote;
        

    //END TESTING!!!

 

    ReactDOM.render( <Root store={store} />, root);
});