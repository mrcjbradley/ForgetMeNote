import React from 'react';
import TimeAgo from 'react-timeago';
import { connect } from 'react-redux';
import { getNote } from '../../../actions/note_actions';
import { NavLink } from 'react-router-dom';



class NoteIndexItem extends React.Component {
    
    previewGenerator(content){
        const charCount = content ? content.length : 0;
        if (charCount <= 75) {
            return content;
        } else {
            return content.slice(0, 75) + '...';
        }
    }

    render(){
        const { note, getNote } = this.props;
        const navPath = typeof note.deleted_at === 'string' ? '/home/trash/' : '/home/notes/';
        return(
            <li className={"NoteItem"}>
            <NavLink to={`${navPath}${note.id}`}  >
                    <div className="NoteItem_NoteTitle">
                        {note.title ? note.title : "untitled"}
                    </div>
                    <div className="NoteItem_NoteContent">
                        {this.previewGenerator(note.plain_text)}
                    </div>
                    <div className="NoteItem_NoteUpdated">
                        <TimeAgo date={note.updated_at} />
                    </div>
            </NavLink>
                </li>
        )
    }
}

const msp = ({ui: {recentNotes: {recentNoteId, recentTrashId}}}, { note, active }) => {
    return ({
        note
    });
};

const mdp = dispatch => ({
    getNote: noteId => dispatch(getNote(noteId))
});


export default connect(msp,mdp)(NoteIndexItem);