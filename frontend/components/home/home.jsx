import React from 'react';
import { logOut } from '../../actions/session_actions';
import HomeSidebar from './home_sidebar';
import NoteIndex from './notes/note_index_container';
import Trash from './notes/trash_container';
import NoteDetail from './notes/note_detail';
import { Route, Switch } from 'react-router-dom';
import Modal from './modal';

export default (props) => {
        return(
        <div className="HomeScreen">
            <Route path="/home" component={Modal} />
            <Route path="/home" component={HomeSidebar} />
            <Switch>
                <Route path="/home/trash" exact component={Trash} />
                <Route path="/home" component={NoteIndex} />
            </Switch>
            <Route path="/home/notes/:noteId" exact component={NoteDetail} />
            
        </div>
        );
}


