import { RECEIVE_ALL_NOTES } from './note_actions';
import { removeAllNotes } from '../util/taggings_api_util';
const receiveAllNotes = ({notes, tags}) => ({
    type: RECEIVE_ALL_NOTES,
    notes,
    tags
});

export const removeAllNotesFromTag = tagId => (
    removeAllNotes(tagId)
    .then(notes => dispatch(receiveAllNotes(notes)),
        errors => dispatch(receiveNoteErrors(errors.responseJSON)))
);