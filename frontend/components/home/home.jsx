import React from 'react';
import { logOut } from '../../actions/session_actions';
import HomeSidebar from './home_sidebar';
import NoteIndex from './notes/note_index';
import NoteDetail from './notes/note_detail';
import { Route } from 'react-router-dom';

export default (props) => {
        return(
        <div className="HomeScreen">
            <Route path="/home" component={HomeSidebar} />
            <NoteIndex />
            <Route path="/home/notes/:noteId" exact component={NoteDetail} />
        </div>
        );
    
}


