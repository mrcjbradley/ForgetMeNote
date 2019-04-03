import React from 'react';
import { getAllNotes, getNote } from '../../../actions/note_actions';
import { connect } from 'react-redux';
import { deletedNotes, mostRecentlyUpdatedNote  } from '../../../util/selectors';
import NoteIndex from './note_index';


const msp = ({ entities: { notes },  ui: { currentNote: {currentNoteId},  editorPreferences: { fullscreen } }, session: { currentUser: { note_sort_order } } }, { history }) => {
    let mostRecentId = null;
        let deleted = [];
        if (Object.values(notes).length >= 2) {    
            deleted =  deletedNotes(Object.values(notes));
            const mostRecent =  mostRecentlyUpdatedNote(deleted);
            mostRecentId = mostRecent.id;
        }
        return ({

            notes: deleted,
            note_sort_order,
            history,
            currentNoteId,
            fullscreen,
            headerText: 'Trash',
            mostRecentId

        });

};

const mdp = dispatch => ({
    getAllNotes: () => dispatch(getAllNotes())
});


export default connect(msp, mdp)(NoteIndex);
