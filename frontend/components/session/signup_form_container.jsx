
import React from 'react';
import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signUp, clearErrors, validateEmail } from '../../actions/session_actions';


// const _nullUser = {
//     id: null,
//     username: null
// };

const msp = ({ session: { currentUser }, errors: { session: errors } }) => {
    return ({
        errors,
        loggedin: Boolean(currentUser.id),
        currentUser,
        
    });
};

const mdp = dispatch => ({
    processForm: user => dispatch(signUp(user)),
    clearErrors: () => dispatch(clearErrors()),
    validateEmail: email => dispatch(validateEmail(email))
});

export default connect(msp, mdp)(SessionForm);