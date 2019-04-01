import {
    RECEIVE_ALL_NOTES,
    RECEIVE_NOTE,
    REMOVE_NOTE
} from '../actions/note_actions';
import { merge } from 'lodash';

const NotesReducer = (oldState={}, action) => {
    Object.freeze(oldState);
    let nextState = merge({}, oldState);
    switch(action.type){
        case RECEIVE_ALL_NOTES:
            const { notes } = action;
            nextState = notes;
            return nextState;
        case RECEIVE_NOTE:
        const { note } = action;
            nextState = merge({}, nextState, { [note.id]: note });
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