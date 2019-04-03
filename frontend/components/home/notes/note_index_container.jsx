import React from 'react';
import { getAllNotes, getNote } from '../../../actions/note_actions';
import { connect } from 'react-redux';
import { notDeletedNotes, mostRecentlyUpdatedNote } from '../../../util/selectors';
import NoteIndex from './note_index';


const msp = ({ 
        entities: { notes }, 
        ui: { currentNoteId, 
        editorPreferences: { fullscreen } }, 
        session: { currentUser: { note_sort_order } } }, { history }) => {
            let mostRecentId = null;
            let notDeleted = [];
            if (Object.values(notes).length >= 2) {    
                notDeleted =  notDeletedNotes(Object.values(notes));
                const mostRecent =  mostRecentlyUpdatedNote(notDeleted);
                mostRecentId = mostRecent.id;
            }
            return ({
                notes: notDeleted,
                note_sort_order,
                history,
                currentNoteId,
                fullscreen,
                headerText: 'All Notes',
                mostRecentId
            });
}

const mdp = dispatch => ({
    getAllNotes: () => dispatch(getAllNotes())
});


export default connect(msp, mdp)(NoteIndex);
