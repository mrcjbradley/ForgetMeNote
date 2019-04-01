import React from 'react';
import { getAllNotes } from '../../../actions/note_actions';
import { connect } from 'react-redux';
import NoteIndexItem from './note_index_item';
import NoteOptionsSortMenu from './note_options_sort_menu';



class NoteIndex extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            sortMenu: false
        };
        this.toggleSortDisplay = this.toggleSortDisplay.bind(this);
    }

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

    toggleSortDisplay(e){
        this.setState({sortMenu: !this.state.sortMenu});
    }

    orderNoteIndexItems(notes){
        const orderTypes = [
            'Date created: Most to least recent',
            'Date created: Least to most recent',
            'Date updated: Most to least recent',
            'Date updated: Least to most recent',
            'Title: A to Z',
            'Title: Z to A'
        ];
        const {  note_sort_order } = this.props;
        const chosen = orderTypes.indexOf(note_sort_order);
        // debugger
        switch(chosen){
            case 0:
                return notes.sort((n1, n2) => {
                    const d1 = new Date(n1.created_at);
                    const d2 = new Date(n2.created_at);
                    return d2 - d1;
                });
            case 1:
                return notes.sort((n1, n2) => {
                    const d1 = new Date(n1.created_at);
                    const d2 = new Date(n2.created_at);
                    return d1 - d2;
                });
            case 2:
                return notes.sort((n1, n2) => {
                    const d1 = new Date(n1.updated_at);
                    const d2 = new Date(n2.updated_at);
                    return d2 - d1;
                });
            case 3:
                return notes.sort((n1, n2) => {
                    const d1 = new Date(n1.updated_at);
                    const d2 = new Date(n2.updated_at);
                    return d1 - d2;
                });
            case 4:
                return notes.sort((n1, n2) => {
                    const t1 = n1.title.toLowerCase();
                    const t2 = n2.title.toLowerCase();
                    if (t1 < t2) return -1;
                    if (t1 > t2) return 1;
                    return 0;
                });
            case 5:
                 return notes.sort((n1, n2) => {
                    const t1 = n1.title.toLowerCase();
                    const t2 = n2.title.toLowerCase();
                    if (t1 < t2) return 1;
                    if (t1 > t2) return -1;
                    return 0;
                });
            default:
                return notes;
        }

    }


    render(){
        const { notes } = this.props;
        const { sortMenu } = this.state;
        const noteItems = this.orderNoteIndexItems(notes).map(note => {
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
                    <div onClick={this.toggleSortDisplay} className="bg--option-dd-icon"></div>
                    { sortMenu ? <NoteOptionsSortMenu toggleSortDisplay={this.toggleSortDisplay}/> : null}
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

const msp = ({ entities: { notes } , session: {currentUser: {note_sort_order}}}) => ({
    notes: Object.values(notes),
    note_sort_order

})

const mdp = dispatch => ({
    getAllNotes: () => dispatch(getAllNotes())
})


export default connect(msp, mdp)(NoteIndex);
