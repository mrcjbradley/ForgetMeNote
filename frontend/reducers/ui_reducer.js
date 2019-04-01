import {
    RECEIVE_ALL_NOTES,
    RECEIVE_NOTE,
    REMOVE_NOTE
} from '../actions/note_actions';
import {
    TOGGLE_FULL_SCREEN,
} from '../actions/ui_actions';

import { newestNote, mostRecentlyUpdatedNote } from '../util/selectors';
import { merge } from 'lodash';

const _placeHolder = {
    loading: false,
    modal: { }, 
    editorPreferences: { fullscreen: false}, 
    recentSearches: [], // pending search feature
    currentNoteId: null,
};

const UIReducer = ( oldState = _placeHolder, action ) => {
    Object.freeze(oldState);
    let nextState = merge({}, oldState);
    switch(action.type){
        case RECEIVE_ALL_NOTES:
            const newest = mostRecentlyUpdatedNote(Object.values(action.notes));
            nextState = merge({}, nextState, {currentNoteId: nextState.currentNoteId || newest.id});
            return nextState;
        case RECEIVE_NOTE:
            const { note: {id: currentNoteId} } = action;
            nextState = merge({}, nextState, {currentNoteId});
            return nextState;
        case TOGGLE_FULL_SCREEN:
            nextState.editorPreferences.fullscreen = !nextState.editorPreferences.fullscreen;
            return nextState;
        default:
            return nextState;
    }
};

export default UIReducer;