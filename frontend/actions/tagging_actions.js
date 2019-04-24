import { 
    RECEIVE_ALL_NOTES,
    RECEIVE_NOTE
 } from './note_actions';
import { removeAllNotes, postTagging, removeTagging } from '../util/taggings_api_util';

const receiveAllNotes = ({notes, tags}) => ({
    type: 'RECEIVE_ALL_NOTES',
    notes,
    tags
});


const receiveNote = ({notes, tags}) => ({
    type: 'RECEIVE_NOTE',
    notes,
    tags
});

export const removeAllNotesFromTag = tagId => (
    removeAllNotes(tagId)
    .then(notes => dispatch(receiveAllNotes(notes))));//,
        // errors => {})
// );

export const postNewTagging = tagging => (
    postTagging({tagging})
    .then(notes => dispatch(receiveAllNotes(notes))));//,
    //   errors => {})
// );

export const removeExistingTagging = tagging => (
    removeTagging({tagging})
    .then(notes => dispatch(receiveAllNotes(notes))));//,
    //   errors => {})
// );