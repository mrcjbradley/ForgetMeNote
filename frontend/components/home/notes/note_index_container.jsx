import React from 'react';
import { getAllNotes, getNote } from '../../../actions/note_actions';
import { connect } from 'react-redux';
import { notDeletedNotes, mostRecentlyUpdatedNote } from '../../../util/selectors';
import NoteIndex from './note_index';
import { values } from 'lodash';


const msp = (state , ownProps ) => {
    const { entities: { notes } } = state;
    const { ui: { recentNotes: { recentNoteId, recentTrashId }, editorPreferences: { fullscreen }  } } = state;
    const { session: { currentUser: { note_sort_order } } } = state;
    const { history, match: { params } } = ownProps;
    const mostRecentId = params.noteId ? params.noteId : recentNoteId;
    
    return ({
        notes: notDeletedNotes(_.values(notes)),
        note_sort_order,
        history,
        fullscreen,
        headerText: 'All Notes',
        mostRecentId
    });
}

const mdp = dispatch => ({
    getAllNotes: () => dispatch(getAllNotes())
});


export default connect(msp, mdp)(NoteIndex);
