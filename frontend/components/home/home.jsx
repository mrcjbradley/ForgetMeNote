import React from 'react';
import { logOut } from '../../actions/session_actions';
import HomeSidebar from './home_sidebar';
import NoteIndex from './notes/note_index_container';
import Trash from './notes/trash_container';
import NoteDetail from './notes/note_detail_container';
import { Route, Switch, Redirect} from 'react-router-dom';
import Modal from './modal';
import { connect } from 'react-redux';

const Home = (props) => {

    

        return(
        <div className="HomeScreen">
            
            <Route path="/home" component={HomeSidebar} />
            <Switch>
                <Route path="/home/notes/:noteId" exact component={NoteIndex} />
                <Route path="/home/notes" component={NoteIndex} />
            </Switch>
            <Switch>
                <Route path="/home/trash/:noteId" exact component={Trash} />
                <Route path="/home/trash" component={Trash} />
            </Switch>
            {/* <Route path="/home/trash/:noteId" exact component={NoteDetail} /> 
            <Route path="/home/notes/:noteId" exact component={NoteDetail} /> */}
           
        </div>
        );
}

const msp = (state) => ({
    state
    // activeNotes: state.notes.activeNotes.map(id => notes[id]),
    // trashedNotes: state.notes.trashedNotes.map(id => notes[id]),
});

export default connect(msp)(Home);


