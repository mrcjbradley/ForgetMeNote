import React from 'react';
import { getAllNotes } from '../../../actions/note_actions';
import { connect } from 'react-redux';
import NoteIndexItem from './note_index_item';
import NoteOptionsSortMenu from './note_options_sort_menu';



class NoteIndex extends React.Component {

    componentDidMount(){
        const { getAllNotes } = this.props;
        getAllNotes();
    }

    handleMouseEnter(e){
        $(e.target).addClass('grey');        
    }
    
    handleMouseLeave(e){
        $(e.target).removeClass('grey');      
    }

    handleOptionClick(e){
        $(e.target).siblings().removeClass('active');
        $(e.target).addClass('active');
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
                <div className="NoteIndex_NoteTagsOptions">
                    <nav className="NoteIndex_NoteOptions">
                    <div className="bg--option-dd-icon"></div>
                    <NoteOptionsSortMenu />
                    </nav>
                    <nav className="NoteIndex_NoteTags">
                        <div className="bg--tag-icon"></div>
                        <ul>
                            <li></li>
                        </ul>
                    </nav>
                </div>
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
