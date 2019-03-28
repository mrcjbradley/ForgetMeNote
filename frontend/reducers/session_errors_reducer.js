import {
    RECEIVE_CURRENT_USER,
    RECEIVE_SESSION_ERRORS,
    CLEAR_ERRORS
} from '../actions/session_actions';
import { uniq } from 'lodash';

export default (state = [], action) => {
    Object.freeze(state);
    let nextState = Array.from(state);
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return _.uniq(nextState.concat(action.errors));
        case RECEIVE_CURRENT_USER:
            return [];
        case CLEAR_ERRORS:
        return [];
        default:
            return state;
    }
};