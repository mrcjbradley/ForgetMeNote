import React from 'react';
import UserNav from './user_nav';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { postNote } from '../../actions/note_actions';
import { postNewTagging } from '../../actions/tagging_actions';
import { values } from 'lodash';

class HomeSidebar extends React.Component {
    constructor(props){
        super(props);
        this.newNote = this.newNote.bind(this);
    }

    newNote(e){
        e.preventDefault();
        const { postNote, history, default_notebook_id , postNewTagging} = this.props;
        const blankNote = {notebook_id: default_notebook_id};
        postNote(blankNote).then(({notes}) => {
            history.push(`/home/notes/${_.values(notes)[0].id}`);
        }); 
    }

    render(){
        const { fullscreen, recentNoteId, recentTrashId } = this.props;
        return (
            <aside className={fullscreen ? "HomeSidebar hide-me" : "HomeSidebar"}>
            <UserNav/>
            {/* <nav className="HomeSidebar_searc-nav">
                <h3 className="HomeSidebar_search-bar">
                    Search Bar
                </h3>
            </nav> */}
            <nav className="HomeSidebar_new-note-nav">
                <Link to="#" onClick={this.newNote} className="HomeSidebar_new-note-button">
                <div className="bg--new-note-icon"></div> New Note
                </Link>
            </nav>
            {/* <nav className="HomeSidebar_shortcuts-nav">
                <ul className="HomeSidebar_shortcuts">
                    <li className="shortcuts_menu">
                        Shortcuts
                        <ul className="ShortcutsList">
                            <li className="ShortcutsList_shortcut">sample 1</li>
                            <li className="ShortcutsList_shortcut">sample 2</li>
                        </ul>
                    </li>
                </ul>
            </nav> */}
            <nav className="HomeSidebar_notes-nav">
                    <NavLink to={`/home/notes/`} className="HomeSidebar_all-notes-button">
                    <div className="bg--note-icon"></div>  All Notes
                </NavLink>
            </nav>
            {/* <nav className="HomeSidebar_Notebooks-nav">
                <ul className="HomeSidebar_Notebooks">
                    <li className="Notebooks_menu">
                        Notebooks
                        <ul className="NotebooksList">
                            <li className="NotebooksList_Notebook">sample 1</li>
                            <li className="NotebooksList_Notebook">sample 2</li>
                        </ul>
                    </li>
                </ul>
            </nav> */}
            <nav className="HomeSidebar_Tags-nav">
                <NavLink to={`/home/tags`} className="HomeSidebar_all-Tags-button">
                    <div className="bg--tag-sb-icon"></div>  Tags
                </NavLink>
            </nav>
                <nav className="HomeSidebar_Trash-nav">

                <NavLink to={`/home/trash/`} className="HomeSidebar_all-Trash-button HomeSidebar_all-notes-button">
                            <div className="bg--trash-icon"></div> Trash
                </NavLink>
            </nav>
        </aside>
    )};
};

const msp = ({ ui: { editorPreferences: { fullscreen }, filters: {tags} }, session: {currentUser: {default_notebook_id}}, ui: { recentNotes: { recentNoteId, recentTrashId }}},  {history} ) => {
    // debugger
    return({
    fullscreen,
    history,
    default_notebook_id,
    recentNoteId,
    recentTrashId,
    tags
})}

const mdp = dispatch => ({
    postNote: note => dispatch(postNote(note)),
    postNewTagging: tagging => dispatch(postNewTagging(tagging))
})


export default connect(msp, mdp)(HomeSidebar);