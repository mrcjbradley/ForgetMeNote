import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { closeModal } from '../../actions/ui_actions';
import * as noteActions from '../../actions/note_actions';
import { secondMostRecentlyUpdatedNote, notDeletedNotes, mostRecentlyUpdatedNote } from '../../util/selectors';
import Modal from './modal';
import { postTag } from '../../actions/tag_action';

const msp = ({ ui: { modal } }, { handleSubmit, history, match: { path, params }, note, notes }) => {
    // debugger
    if (modal.title === 'Delete note'){
        let nextId = '';
        if (notes && notes.length >= 2) {
            const nextNote = secondMostRecentlyUpdatedNote(notes) ? secondMostRecentlyUpdatedNote(notes) : mostRecentlyUpdatedNote(notes);
            nextId = nextNote.id;
        }
        return ({
            modal,
            note,
            nextId,
            history,
            name: ''
        });
    }

    // debugger
    return({
            modal,
            history,
            handleSubmit
        });
    
};

const mdp = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    deleteNote: noteId => dispatch(noteActions.deleteNote(noteId)),
    patchNote: note => dispatch(noteActions.patchNote(note)),
    postTag: tag => dispatch(postTag(tag))
});


export default withRouter(connect(msp, mdp)(Modal));