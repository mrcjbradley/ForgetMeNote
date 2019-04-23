import { connect } from 'react-redux';
import { getNote, patchNote } from '../../../actions/note_actions';
import { toggleFullScreen } from '../../../actions/ui_actions';
import { openModal } from '../../../actions/ui_actions';
import NoteDetail from './note_detail';
import { withRouter } from 'react-router-dom';
import { deletedNotes, notDeletedNotes } from '../../../util/selectors';

const msp = (state, ownProps) => {
    const noteId = ownProps.match.params.noteId ? ownProps.match.params.noteId : state.ui.recentNotes.currentNoteId;
    const note = ownProps.note ? ownProps.note : ownProps.notes.filter(note => note.id === noteId )[0];
    return ({
        note,
        history: ownProps.history,
        path: ownProps.match.path,
        open: state.ui.modal.open
    });
};

const mdp = dispatch => ({
    getNote: noteId => dispatch(getNote(noteId)),
    patchNote: noteId => dispatch(patchNote(noteId)),
    toggleFullScreen: () => dispatch(toggleFullScreen()),
    openModal: modal => dispatch(openModal(modal))
});


const connectedComponent = connect(msp, mdp)(NoteDetail);
export default withRouter(connectedComponent);

// export default connect(msp, mdp)(NoteDetail);