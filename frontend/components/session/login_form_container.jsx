
import React from 'react';
import { connect } from 'react-redux';
import SessionForm from './session_form';
import { logIn } from '../../actions/session_actions';



// const _nullUser = {
//     id: null,
//     email: null
// };

const msp = ({ session: { currentUser }, errors: { session: errors } }) =>
{
    return ({
        errors,
        loggedin: Boolean(currentUser.id),
        currentUser
    });
};

const mdp = dispatch => ({
    processForm: user => dispatch(logIn(user))
});

export default connect(msp, mdp)(SessionForm);