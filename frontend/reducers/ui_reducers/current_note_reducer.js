import {
    RECEIVE_ALL_NOTES,
    RECEIVE_NOTE,
    REMOVE_NOTE
} from '../../actions/note_actions';
import {
    mostRecentlyUpdatedNote
} from '../../util/selectors';
import { merge } from 'lodash';

const _placeHolder = null;

const currentNoteReducer = (oldState = _placeHolder, action) => {
    Object.freeze(oldState);
    let nextState = merge({}, oldState);
    switch (action.type) {
        case RECEIVE_ALL_NOTES:
            const newest = mostRecentlyUpdatedNote(Object.values(action.notes));
            nextState = merge({}, nextState, {
                currentNoteId: nextState.currentNoteId || newest.id
            });
            return nextState;
        case RECEIVE_NOTE:
            const { note: { id: currentNoteId } } = action;
            nextState = merge({}, nextState, {  currentNoteId
            });
            return nextState;
        default:
            return nextState;
    }
};

export default currentNoteReducer;