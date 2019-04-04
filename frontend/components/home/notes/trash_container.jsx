import React from 'react';
import { getAllNotes, getNote, emptyTrash } from '../../../actions/note_actions';
import { connect } from 'react-redux';
import { deletedNotes, mostRecentlyUpdatedNote  } from '../../../util/selectors';
import NoteIndex from './note_index';
import { values } from 'lodash';


const msp = (state , ownProps ) => {
    const { entities: { notes } } = state;
    const { ui: { recentNotes: { recentNoteId, recentTrashId }, editorPreferences: { fullscreen }  } } = state;
    const { session: { currentUser: { note_sort_order } } } = state;
    const { history, match: {params} } = ownProps;
    const mostRecentId = params.noteId ? params.noteId : recentTrashId;
    const emptyTrashNote = {
        content: "",
        created_at: `${new Date()}`,
        deleted_at: `${new Date()}`,
        fav: false,
        id: -1,
        notebook_id: 547,
        title: "Trash is empty!",
        updated_at: `${new Date()}`
    };
    
        return ({

            notes: recentTrashId === -1 ? [emptyTrashNote] : deletedNotes(_.values(notes)),
            note_sort_order,
            history,
            fullscreen,
            headerText: 'Trash',
            mostRecentId

        });

};

const mdp = dispatch => ({
    getAllNotes: () => dispatch(getAllNotes()),
    emptyTrash: () => dispatch(emptyTrash())
});


export default connect(msp, mdp)(NoteIndex);
