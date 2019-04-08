import * as NoteApiUtil from '../util/note_api_util';
import { values } from 'lodash';

export const [
    RECEIVE_ALL_NOTES,
    RECEIVE_NOTE,
    REMOVE_NOTE,
    RECEIVE_DELETED_NOTE,
    RECEIVE_NOTE_ERRORS
] = [
    'RECEIVE_ALL_NOTES',
    'RECEIVE_NOTE',
    'REMOVE_NOTE',
    'RECEIVE_DELETED_NOTE',
    'RECEIVE_NOTE_ERRORS'
];

const receiveAllNotes = ({notes, tags}) => ({
    type: RECEIVE_ALL_NOTES,
    notes,
    tags
});

const receiveNote = ({notes, tags}) => ({
    type: RECEIVE_NOTE,
    notes,
    tags
});

const receiveDeletedNote = ({notes, tags}) => ({
    type: RECEIVE_DELETED_NOTE,
    notes, 
    tags
});

const removeNote = noteId => ({
    type: REMOVE_NOTE,
    noteId
});

const receiveNoteErrors = ({ errors }) => ({
    type: RECEIVE_NOTE_ERRORS,
    errors
});

export const getAllNotes = () => dispatch => (
    NoteApiUtil.getAllNotes()
    .then(notes => dispatch(receiveAllNotes(notes)),
    errors => dispatch(receiveNoteErrors(errors.responseJSON)))
);

export const getNote = noteId => dispatch => (
    NoteApiUtil.getNote(noteId)
          .then(note => {
        if (typeof note.deleted_at === 'string') {
            return dispatch(receiveDeletedNote(note)); 
         } else {
            return dispatch(receiveNote(note));
         } 
    } ,errors => dispatch(receiveNoteErrors(errors.responseJSON)))
);

export const postNote = note => dispatch => (
    NoteApiUtil.postNote(note)
    .then(note => dispatch(receiveNote(note)),
    errors => dispatch(receiveNoteErrors(errors.responseJSON)))
);

export const patchNote = note => dispatch => {
    return (
    NoteApiUtil.patchNote(note)
    .then(note => {
        if (typeof _.values(note.notes)[0].deleted_at === 'string') {
            return dispatch(receiveDeletedNote(note)); 
         } else {
            return dispatch(receiveNote(note));
         } 
    } ,errors => dispatch(receiveNoteErrors(errors.responseJSON)))
);};

export const deleteNote = noteId => dispatch => (
    NoteApiUtil.deleteNote(noteId)
    .then(({noteId}) => dispatch(removeNote(noteId)),
    errors => dispatch(receiveNoteErrors(errors.responseJSON)))
);

export const emptyTrash = () => dispatch => (
    NoteApiUtil.emptyTrash()
    .then(notes => dispatch(receiveAllNotes(notes))));
    //,
   // errors => dispatch(receiveNoteErrors(errors.responseJSON)))
//);
