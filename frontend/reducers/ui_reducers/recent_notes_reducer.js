import {
    RECEIVE_ALL_NOTES,
    RECEIVE_NOTE,
    RECEIVE_DELETED_NOTE
} from '../../actions/note_actions';
import {
    RECEIVE_CURRENT_USER
} from '../../actions/session_actions';
import {
    mostRecentlyUpdatedNote,
    deletedNotes,
    notDeletedNotes
} from '../../util/selectors';
import {
    merge,
    values
} from 'lodash';

const _placeHolder = {
    recentNoteId: null,
    recentTrashId: null,
    // currentNoteId: null
};

const recentNotesReducer = (oldState = _placeHolder, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return action.recentNotes;
        case RECEIVE_ALL_NOTES:
        debugger
            const deleted = deletedNotes(_.values(action.notes));
            const notDeleted = notDeletedNotes(_.values(action.notes));
            const newRecents = {
                recentNoteId: notDeleted.length === 0 ? -1 : mostRecentlyUpdatedNote(notDeleted).id,
                recentTrashId: deleted.length === 0 ? -1 : mostRecentlyUpdatedNote(deleted).id
            };
            return merge({}, oldState, newRecents);
        case RECEIVE_NOTE:
            const recentNote = {
                recentNoteId: _.values(action.notes)[0].id
            };
            return merge({}, oldState, recentNote);
        case RECEIVE_DELETED_NOTE:
            const recentTrash = {
                recentTrashId: _.values(action.notes)[0].id
            };
            return merge({}, oldState, recentTrash);
        default:
            return oldState;
    }
};

export default recentNotesReducer;