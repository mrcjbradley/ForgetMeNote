import { connect } from 'react-redux';
import { getNote, patchNote } from '../../../actions/note_actions';
import { toggleFullScreen } from '../../../actions/ui_actions';
import { openModal } from '../../../actions/ui_actions';
import NoteDetail from './note_detail';
import { withRouter } from 'react-router-dom';
import { deletedNotes, notDeletedNotes } from '../../../util/selectors';

const msp = (state, ownProps) => {
    // const { entities: { notes }, ui: { recentNotes: { recentNoteId, recentTrashId } } } = state;
    // const { history, match: { path, params: {noteId} } } = ownProps;
    // let filtered = Object.values(notes);
    // let note = {title: '', content: ''};
    // // debugger
    // if (path.includes('/home/notes')) {
    //     filtered = notDeletedNotes(filtered);
    //     note = filtered[recentNoteId];
    // }    
    // if (path.includes('/home/trash')) {
    //     // debugger
    //     filtered = deletedNotes(filtered);    
    //     note = filtered[recentTrashId];
    // }    
    // // if ( typeof noteId !== undefined ){
    // //     debugger
    // //     note = notes[noteId] ;
    // // }
    // debugger
    return ({
        note: ownProps.note,
        history: ownProps.history,
        path: ownProps.match.path
    });
};

const mdp = dispatch => ({
    getNote: noteId => dispatch(getNote(noteId)),
    patchNote: noteId => dispatch(patchNote(noteId)),
    toggleFullScreen: () => dispatch(toggleFullScreen()),
    openModal: modal => dispatch(openModal(modal))
})


const connectedComponent = connect(msp, mdp)(NoteDetail);
export default withRouter(connectedComponent);

// export default connect(msp, mdp)(NoteDetail);