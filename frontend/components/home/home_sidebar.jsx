import React from 'react';
import UserNav from './user_nav';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { postNote } from '../../actions/note_actions';

class HomeSidebar extends React.Component {
    constructor(props){
        super(props);
        this.newNote = this.newNote.bind(this);
    }

    newNote(e){
        e.preventDefault();
        const { postNote, history, default_notebook_id } = this.props;
        const blankNote = {notebook_id: default_notebook_id};
        postNote(blankNote).then(({note}) => {
            history.push(`home/notes/${note.id}`);
        }); 
    }

    render(){
        const { fullscreen } = this.props;
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
                <NavLink to="/home/notes" className="HomeSidebar_all-notes-button">
                    <div className="bg--note-icon"></div>  All Notes
                </NavLink>
            </nav>
            <nav className="HomeSidebar_Notebooks-nav">
                <ul className="HomeSidebar_Notebooks">
                    <li className="Notebooks_menu">
                        Notebooks
                        <ul className="NotebooksList">
                            <li className="NotebooksList_Notebook">sample 1</li>
                            <li className="NotebooksList_Notebook">sample 2</li>
                        </ul>
                    </li>
                </ul>
            </nav>
            {/* <nav className="HomeSidebar_Tags-nav">
                <h3 className="HomeSidebar_all-Tags-button">
                    Tags
                </h3>
            </nav> */}
            <nav className="HomeSidebar_Trash-nav">
                <h3 className="HomeSidebar_all-Trash-button">
                    Trash
                </h3>
            </nav>
        </aside>
    )};
};

const msp = ({ ui: { editorPreferences: { fullscreen } }, session: {currentUser: {default_notebook_id}} },  {history} ) => ({
    fullscreen,
    history,
    default_notebook_id
})

const mdp = dispatch => ({
    postNote: note => dispatch(postNote(note))
})


export default connect(msp, mdp)(HomeSidebar);