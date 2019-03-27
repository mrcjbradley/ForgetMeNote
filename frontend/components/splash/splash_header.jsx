import React from 'react';
import SplashNav from './splash_nav';
import SessionNav from './session_nav';
import {Link} from 'react-router-dom';

export default (props) => {
    return(
        <header className="splash-header">
            <div className="top">
                <div className="row">
                    <div className="logo">
                    	<span>Evernote</span>
                        {/* logo image instead of span */}
                        <Link to='/'>
                            <figure></figure>
                        </Link>
                    </div>
                    <SplashNav />
                    <SessionNav />
                </div>
            </div>
        </header>
    )
};

