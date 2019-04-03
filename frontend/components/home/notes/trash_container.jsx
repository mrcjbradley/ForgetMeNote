import React from 'react';
import { getAllNotes, getNote } from '../../../actions/note_actions';
import { connect } from 'react-redux';
import { deletedNotes } from '../../../util/selectors';
import NoteIndex from './note_index';


const msp = ({ entities: { notes },  ui: { currentNote: {currentNoteId},  editorPreferences: { fullscreen } }, session: { currentUser: { note_sort_order } } }, { history }) => {

    return ({

        notes: deletedNotes(Object.values(notes)),
        note_sort_order,
        history,
        currentNoteId,
        fullscreen,
        headerText: 'Trash',

    });

};

const mdp = dispatch => ({
    getAllNotes: () => dispatch(getAllNotes())
});


export default connect(msp, mdp)(NoteIndex);
