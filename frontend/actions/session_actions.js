import * as SessAPIUtil from '../util/session_api_util';
export const [
    RECEIVE_CURRENT_USER,
    LOGOUT_CURRENT_USER,
    RECEIVE_SESSION_ERRORS
] = [
    'RECEIVE_CURRENT_USER',
    'LOGOUT_CURRENT_USER',
    'RECEIVE_SESSION_ERRORS'
];

const receiveCurrentUser = (user) => ({
    type: RECEIVE_CURRENT_USER,
    user
});

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});

const receiveSessionErrors = ({ errors }) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
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