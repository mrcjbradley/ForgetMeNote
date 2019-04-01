import React from 'react';
import TimeAgo from 'react-timeago';
import { connect } from 'react-redux';
import { getNote } from '../../../actions/note_actions';
import { NavLink } from 'react-router-dom';



class NoteIndexItem extends React.Component {
    
    previewGenerator(content){
        const charCount = content.length;
        if (charCount <= 75) {
            return content;
        } else {
            return content.slice(0, 75) + '...';
        }
    }

    render(){
        const { note, active, getNote } = this.props;
        return(
            <li className={"NoteItem" + active}>
            <NavLink to={`/home/notes/${note.id}`} >
                    <div className="NoteItem_NoteTitle">
                        {note.title}
                    </div>
                    <div className="NoteItem_NoteContent">
                        {this.previewGenerator(note.content)}
                    </div>
                    <div className="NoteItem_NoteUpdated">
                        <TimeAgo date={note.updated_at} />
                    </div>
            </NavLink>
                </li>
        )
    }
}

const msp = ({ui: {currentNoteId}}, { note }) => {
    const active = note.id === currentNoteId ? " active" : "";
    return ({
        note,
        active
    });
};

const mdp = dispatch => ({
    getNote: noteId => dispatch(getNote(noteId))
});


export default connect(msp,mdp)(NoteIndexItem);