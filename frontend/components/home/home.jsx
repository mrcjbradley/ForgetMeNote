import React from 'react';
import { logOut } from '../../actions/session_actions';
import HomeSidebar from './home_sidebar';
import NoteIndex from './notes/note_index_container';
import Trash from './notes/trash_container';
import NoteDetail from './notes/note_detail';
import { Route, Switch, Redirect} from 'react-router-dom';
import Modal from './modal';
// import { connect } from 'react-redux';

const Home = ({currentNoteId}) => {

    

        return(
        <div className="HomeScreen">
            <Route path="/home" component={Modal} />
            <Route path="/home" component={HomeSidebar} />
            <Switch>
                <Route path="/home/trash" component={Trash} />
                <Route path="/home/" component={NoteIndex} />
            </Switch>
            <Route path="/home/notes/:noteId" exact component={NoteDetail} />
            <Route path="/home/trash/:noteId" exact component={NoteDetail} />
        </div>
        );
}

const msp = ({session: { currentNoteId }}) => ({
    currentNoteId
});

export default Home;


