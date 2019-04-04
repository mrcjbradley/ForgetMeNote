import React from 'react';
import NoteIndexItem from './note_index_item';
import NoteOptionsSortMenu from './note_options_sort_menu';
import { Redirect, Route, Switch } from 'react-router-dom';
import NoteDetail from './note_detail_container';
import { mostRecentlyUpdatedNote } from '../../../util/selectors';




class NoteIndex extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            sortMenu: false,
            notes: this.props.notes
        };
        this.toggleSortDisplay = this.toggleSortDisplay.bind(this);
    debugger
    }

    componentDidMount(){
        const { getAllNotes } = this.props;
        getAllNotes();
    }

    componentDidUpdate(prevProps){
        if (prevProps.notes !== this.props.notes){
            this.setState({notes: this.props.notes});
        }
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
        debugger
        if (this.state.notes.length === 0) return null;
        // debugger
        const { notes, fullscreen, headerText, mostRecentId} = this.props;
        const { sortMenu } = this.state;
        const noteItems = this.orderNoteIndexItems(this.state.notes).map(note => {
           return <NoteIndexItem note={note} key={note.id} />
        });
        const tagsIcon = (
            <nav className="NoteIndex_NoteTags">
                <div className="bg--tag-icon"></div>
                <ul>
                    <li></li>
                </ul>
            </nav>
        )
        const mostRecent = this.state.notes.filter(note => note.id === parseInt(mostRecentId));
        debugger
        return(
            <>
        <aside className={ fullscreen ? "NoteIndex hide-me" : "NoteIndex"}>
            <header className="NoteIndex_NoteIndexHeader">
                <div className="NoteIndex_NoteIndexTitle">
                    <h1 className="">{headerText}</h1>
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
                    { headerText === 'Trash' ? null : tagsIcon }
                </div>
            </div>
            </header>
            <ul className="NoteIndex_NoteRoll">
                {noteItems}
            </ul>
        </aside>
            <NoteDetail note={mostRecent[0]}/>
        </>
        )
    }
}


export default NoteIndex;

//<Route path='/home/notes/:noteId' component={NoteDetail} />

//<Route path='/home/trash/:noteId' component={NoteDetail} />
{/* <Route path="/home/trash" exact nnnote={mostRecent} render={props => {
        return (<NoteDetail {...props} />);
    }} 
/>
<Route path="/home/notes" exact nnnote={mostRecent} render={props => {
        return (<NoteDetail {...props} />);
    }}  />*/}
