import React from 'react';
import { getAllNotes } from '../../actions/note_actions';
import { connect } from 'react-redux'


class NoteIndex extends React.Component {

    componentDidMount(){
        const { getAllNotes } = this.props;
        getAllNotes();
    }

    previewGenerator(content){
        const charCount = content.length;
        if (charCount <= 75) {
            return content;
        } else {
            return content.slice(0,75) + '...';
        }    
    }

    render(){
        const { notes } = this.props;
        const noteItems = notes.map((note, idx) => (
            <li className="NoteItem" key={idx}>
                <div className="NoteItem_NoteTitle">
                    {note.title}
                </div>
                <div className="NoteItem_NoteContent">
                    {this.previewGenerator(note.content)}
                </div>
                <div className="NoteItem_NoteUpdated">
                    {note.updated_at}
                </div>
            </li>
        ))
        return(
        <aside className="NoteIndex">
            <h1 className="NoteIndex_NoteHeader">All Notes</h1>
            <span className="NoteIndex_NoteCount">{notes.length} notes</span>
            <nav className="NoteIndex_Note-options">
                <ul>
                    <li>Sorting/Filtering Options</li>
                    <li>Tags</li>
                </ul>
            </nav>
            <ul>
                {noteItems}
            </ul>
        </aside>
        )
    }
}

const msp = ({ entities: { notes } }) => ({
    notes: Object.values(notes)
})

const mdp = dispatch => ({
    getAllNotes: () => dispatch(getAllNotes())
})


export default connect(msp, mdp)(NoteIndex);
