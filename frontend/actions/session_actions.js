import * as SessAPIUtil from '../util/session_api_util';
export const [
    RECEIVE_CURRENT_USER,
    LOGOUT_CURRENT_USER,
    RECEIVE_SESSION_ERRORS,
    RECEIVE_VALID_EMAIL,
    CLEAR_ERRORS
] = [
    'RECEIVE_CURRENT_USER',
    'LOGOUT_CURRENT_USER',
    'RECEIVE_SESSION_ERRORS',
    'RECEIVE_VALID_EMAIL',
    'CLEAR_ERRORS'
];

const receiveCurrentUser = ({user, recentNotes}) => ({
    type: RECEIVE_CURRENT_USER,
    user,
    recentNotes
});

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});

const receiveSessionErrors = ({ errors }) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

const receiveValidEmail = ({validEmail}) => ({
    type: RECEIVE_VALID_EMAIL,
    validEmail 
});

export const clearErrors = () => ({
    type: CLEAR_ERRORS
});

export const signUp = user => dispatch => (
    SessAPIUtil.signUp(user)
    .then(user => dispatch(receiveCurrentUser(user)), 
    errors => dispatch(receiveSessionErrors(errors.responseJSON))
));

export const logIn = user => dispatch => (
    SessAPIUtil.logIn(user)
    .then(user => dispatch(receiveCurrentUser(user)))
    .fail(errors => dispatch(receiveSessionErrors(errors.responseJSON)))
);

export const logOut = () => dispatch => (
    SessAPIUtil.logOut()
    .then(user => dispatch(logoutCurrentUser(user)),
    errors  => dispatch(receiveSessionErrors(errors.responseJSON)))
);

export const validateEmail = email => dispatch => (
    SessAPIUtil.validateEmail(email)
    .then(validEmail => dispatch(receiveValidEmail(validEmail)),
    errors => dispatch(receiveSessionErrors(errors.responseJSON)))
);

export const updateUser = user => dispatch => (
    SessAPIUtil.updateUser(user)
    .then(user => dispatch(receiveCurrentUser(user)))
);