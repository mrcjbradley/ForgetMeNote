import React from 'react';
import { getAllNotes, getNote } from '../../../actions/note_actions';
import { removeTagFilter } from '../../../actions/ui_actions';
import { connect } from 'react-redux';
import { notDeletedNotes, mostRecentlyUpdatedNote } from '../../../util/selectors';
import NoteIndex from './note_index';
import { values } from 'lodash';



const msp = (state, ownProps) => {
    const { entities: { notes, tags } } = state;
    const { ui: { filters, recentNotes: { recentNoteId, recentTrashId }, editorPreferences: { fullscreen } } } = state;
    const { session: { currentUser: { note_sort_order , default_notebook_id} } } = state;
    const { history, match: { params } } = ownProps;
    const mostRecentId = params.noteId ? params.noteId : state.ui.recentNotes.recentNoteId;

    const emptyIndexNote = {
        content: "",
        created_at: `${new Date()}`,
        deleted_at: null,
        fav: false,
        id: -1,
        notebook_id: default_notebook_id,
        title: "You have no notes!",
        updated_at: `${new Date()}`
    }; 
    // debugger
    const filteredNotes = filters.tags < 0 ? _.values(notes) : tags[filters.tags].note_ids.map(noteId => notes[noteId]); 

    return ({
        notes: recentNoteId === -1 ? [emptyIndexNote] : notDeletedNotes(filteredNotes),
        note_sort_order,
        history,
        fullscreen,
        headerText: 'All Notes',
        mostRecentId,
        fillerNote: emptyIndexNote,
        filterTags: tags[filters.tags] ? tags[filters.tags] : null
    });
};

const mdp = dispatch => ({
    getAllNotes: () => dispatch(getAllNotes()),
    removeTagFilter: () => dispatch(removeTagFilter())
});


export default connect(msp, mdp)(NoteIndex);