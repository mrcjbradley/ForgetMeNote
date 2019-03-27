import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <>
    <nav className="session-nav">
        <ul>
            <li><Link to='/signup'> Sign Up </Link></li>
            <li><span> or </span></li>
            <li><Link className="btn" to="/login"> Log In </Link></li>
        </ul>
    </nav>
    </>
)