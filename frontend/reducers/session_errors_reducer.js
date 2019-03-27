import {
    RECEIVE_CURRENT_USER,
    RECEIVE_SESSION_ERRORS
} from '../actions/session_actions';

export default (state = [], action) => {
    Object.freeze(state);
    let nextState = Array.from(state);
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return nextState.concat(action.errors);
        case RECEIVE_CURRENT_USER:
            return [];
        default:
            return state;
    }
};