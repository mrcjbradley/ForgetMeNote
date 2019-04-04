import React from 'react';
import {
    connect
} from 'react-redux';
import {
    Redirect,
    Route,
    withRouter
} from 'react-router-dom';

const msp = ({session: {currentUser: {id}}, ui: { recentNotes } }) => {
    // debugger
    return({
    loggedIn: Boolean(id),
    recentNotes
});};

const Auth = ({component: Component, path, loggedIn, exact, recentNotes}) => ( 
    <Route exact={exact} path={path} render={props => {
        return ( loggedIn ? <Redirect to={`/home/notes/${recentNotes.recentNoteId}`} /> : <Component {...props}/> ) }
    }/>
);

const Protected = ({ component: Component, path, loggedIn , exact}) => ( 
    < Route exact={exact} path={path} render={props => ( loggedIn ? <Component {...props} /> : <Redirect to="/"/>) }/>
);

export const AuthRoute = withRouter(connect(msp)(Auth));
export const ProtectedRoute = withRouter(connect(msp, undefined)(Protected));
