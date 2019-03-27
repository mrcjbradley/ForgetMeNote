
import React from 'react';
import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signUp } from '../../actions/session_actions';


// const _nullUser = {
//     id: null,
//     username: null
// };

const msp = ({ session: { currentUser }, errors: { session: errors } }) => {
    return ({
        errors,
        loggedin: Boolean(currentUser.id),
        currentUser
    });
};

const mdp = dispatch => ({
    processForm: user => dispatch(signUp(user))
});

export default connect(msp, mdp)(SessionForm);