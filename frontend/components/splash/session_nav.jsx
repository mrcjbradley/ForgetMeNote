import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <>
    <Link to='/signup'> Sign Up </Link>
    <span> or </span>
    <Link className="btn" to="/login"> Log In </Link>
    </>
)