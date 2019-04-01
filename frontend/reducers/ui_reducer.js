import {
    RECEIVE_ALL_NOTES,
    RECEIVE_NOTE,
    REMOVE_NOTE
} from '../actions/note_actions';
import { newestNote } from '../util/selectors';
import { merge } from 'lodash';

const _placeHolder = {
    loading: false,
    modal: { }, 
    editorPreferences: {}, 
    recentSearches: [], // pending search feature
    currentNoteId: null,
};

const UIReducer = ( oldState = _placeHolder, action ) => {
    Object.freeze(oldState)

    let nextState = merge({}, oldState);
    switch(action.type){
        case RECEIVE_ALL_NOTES:
            const newest = newestNote(Object.values(action.notes));
            nextState = merge({}, nextState, {currentNoteId: newest.id});
            return nextState;
        case RECEIVE_NOTE:
            const { note: {id: currentNoteId} } = action;
            nextState = merge({}, nextState, {currentNoteId});
            return nextState;
        default:
            return nextState;
    }
};

export default UIReducer;