import {
    RECEIVE_CURRENT_USER,
    LOGOUT_CURRENT_USER,
    // RECEIVE_SESSION_ERRORS
} from '../actions/session_actions';
import { merge } from 'lodash';

const _nullUser = {
    id: '',
    email: '',
    image_url: ''
};

export default (oldState = _nullUser, {type, user}) => {
    Object.freeze(oldState);
    switch(type){
        case RECEIVE_CURRENT_USER:
            return user;
        case LOGOUT_CURRENT_USER:
            return _nullUser;
        default:
            return oldState;
    }
};