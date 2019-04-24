import {
    RECEIVE_ALL_NOTES,
    RECEIVE_NOTE,
    REMOVE_NOTE,
    RECEIVE_DELETED_NOTE
} from '../actions/note_actions';
import { REMOVE_TAG } from '../actions/tag_action';

import { merge } from 'lodash';

const NotesReducer = (oldState={}, action) => {
    Object.freeze(oldState);
    let nextState = merge({}, oldState);
    const { notes } = action;
    switch(action.type){
        case RECEIVE_ALL_NOTES:
            nextState = notes;
            return nextState;
        
        case RECEIVE_DELETED_NOTE:
        case RECEIVE_NOTE:
            nextState = merge({}, nextState, notes);
            return nextState;
        case REMOVE_NOTE:
            const { noteId } = action;
            delete nextState[noteId];
            return nextState;
        default:
            return oldState;
    }
};

export default NotesReducer;