import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { closeModal } from '../../actions/ui_actions';
import * as noteActions from '../../actions/note_actions';
import { merge, values } from 'lodash';
import { secondMostRecentlyUpdatedNote, notDeletedNotes } from '../../util/selectors';

class Modal extends React.Component {
    constructor(props){
        super(props);
        this.handleButton = this.handleButton.bind(this);
    }

handleButton(btnType){
    const { currentNoteId, nextId, patchNote, history, note, closeModal, deleteNote, modal: { open, modal: { title, content, buttonType } } } = this.props;
    switch(btnType){
        case 'cancel':
            return e => {
                e.preventDefault();
                closeModal();
            };
        case 'continue':
            return e => {
                e.preventDefault();
                return title === 'Delete note' ? patchNote(merge({}, note,{deleted_at: new Date()})).then(()=> closeModal()).then(() => history.push(`/home/notes/${nextId}`) ) : null;
            };
        default:
            return null;
    }
}


render(){
     const { modal: {open , modal: { title, content, buttonType }} } = this.props;
    const buttons = buttonType.split(' ').map((btn, idx) => {
        return (<Link to="#" key={idx} className={`modal-btn btn-${idx} ${btn}`} onClick={this.handleButton(`${btn}`)}>
            {btn}
        </Link>);
    })
    if (open) {
        return (
            <div className="clickOutWrapper modal">
                <div className="modalBody">
                    <header className="modalHeader">
                        <h1 className="modalTitle">{title}</h1>
                        <div className="bg--exit-icon"></div>
                    </header>
                    <div className="modalContent">
                        {content}
                    </div>
                    <div className="modalFooter">
                        <div className="modalButtons">
                            {buttons}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
    return null;
    }
};

const msp = ({  entities: {notes}, ui: { recentNotes: {recentNoteId, recentTrashId} , modal } }, { history, match: {path, params} } ) => {
    let note;
     if (params.noteId) {
        note = notes[params.noteId];
        } else {
        note = path.includes('notes') ? notes[recentNoteId] : notes[recentTrashId];
        }
    let nextId = '';
    if (_.values(notes).length >= 2) {
        const allNotes = Object.values(notes);
        const notDeleted = notDeletedNotes(allNotes);
        const nextNote = secondMostRecentlyUpdatedNote(notDeleted);
        nextId = nextNote.id;
    } 
    return({
        modal,
        // currentNoteId,
        note,
        nextId,
        history
    });
}

const mdp = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    deleteNote: noteId => dispatch(noteActions.deleteNote(noteId)),
    patchNote: note => dispatch(noteActions.patchNote(note))
})

export default connect(msp,mdp)(Modal);