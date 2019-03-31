import React from 'react';
import { getAllNotes } from '../../../actions/note_actions';
import { connect } from 'react-redux';
import NoteIndexItem from './note_index_item';


class NoteIndex extends React.Component {

    componentDidMount(){
        const { getAllNotes } = this.props;
        getAllNotes();
    }



    render(){
        const { notes } = this.props;
        const noteItems = notes.map(note => {
           return <NoteIndexItem note={note} key={note.id} />
        });
        return(
        <aside className="NoteIndex">
            <header className="NoteIndex_NoteIndexHeader">
                <div className="NoteIndex_NoteIndexTitle">
                    <h1 className="">All Notes</h1>
                </div>
            <div className="NoteIndex_NoteIndexDetails">
                <span className="NoteIndex_NoteCount">
                    {notes.length} notes
                </span>
                <nav className="NoteIndex_Note-options">
                    <ul>
                        <li>Sorting/Filtering Options</li>
                    </ul>
                </nav>
                <nav className="NoteIndex_Note-Tags">
                    <ul>
                        <li>Tags</li>
                    </ul>
                </nav>
            </div>
            </header>
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
