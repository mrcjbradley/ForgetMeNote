import React from 'react';
import SplashNav from './splash_nav';
import SessionNav from './session_nav';

export default (props) => {
    return(
        <header>
            <h1>Evernote</h1>
            <SplashNav />
            <SessionNav />
        </header>
    )
};