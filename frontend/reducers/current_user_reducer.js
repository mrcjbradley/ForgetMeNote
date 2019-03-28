import {
    RECEIVE_CURRENT_USER,
    LOGOUT_CURRENT_USER,
    RECEIVE_VALID_EMAIL,
    // RECEIVE_SESSION_ERRORS
} from '../actions/session_actions';
import { merge } from 'lodash';
import { validateEmail } from '../util/session_api_util';

const _nullUser = {
    id: null,
    email: null,
    image_url: null
};

export default (oldState = _nullUser, {type, user, validEmail}) => {
    Object.freeze(oldState);
    switch(type){
        case RECEIVE_CURRENT_USER:
            return user;
        case LOGOUT_CURRENT_USER:
            return _nullUser;
        case RECEIVE_VALID_EMAIL:
            const nextState = Object.assign({}, _nullUser, {email: validEmail});
            return nextState;
        default:
            return oldState;
    }
};