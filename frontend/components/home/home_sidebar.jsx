import React from 'react';
import UserNav from './user_nav';
import { connect } from 'react-redux';

class HomeSidebar extends React.Component {
    render(){
        const { fullscreen } = this.props;
        return (
            <aside className={fullscreen ? "HomeSidebar hide-me" : "HomeSidebar"}>
            <UserNav/>
            <nav className="HomeSidebar_searc-nav">
                <h3 className="HomeSidebar_search-bar">
                    Search Bar
                </h3>
            </nav>
            <nav className="HomeSidebar_new-note-nav">
                <h3 className="HomeSidebar_new-note-button">
                    New Note
                </h3>
            </nav>
            <nav className="HomeSidebar_shortcuts-nav">
                <ul className="HomeSidebar_shortcuts">
                    <li className="shortcuts_menu">
                        Shortcuts
                        <ul className="ShortcutsList">
                            <li className="ShortcutsList_shortcut">sample 1</li>
                            <li className="ShortcutsList_shortcut">sample 2</li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <nav className="HomeSidebar_notes-nav">
                <h3 className="HomeSidebar_all-notes-button">
                    All Notes
                </h3>
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
            <nav className="HomeSidebar_Tags-nav">
                <h3 className="HomeSidebar_all-Tags-button">
                    Tags
                </h3>
            </nav>
            <nav className="HomeSidebar_Trash-nav">
                <h3 className="HomeSidebar_all-Trash-button">
                    Trash
                </h3>
            </nav>
        </aside>
    )};
};

const msp = ({ ui: { editorPreferences: { fullscreen } } }) => ({
    fullscreen
})


export default connect(msp)(HomeSidebar);