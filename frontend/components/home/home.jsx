import React from 'react';
import HomeSidebar from './home_sidebar';
import NoteIndex from './notes/note_index_container';
import Trash from './notes/trash_container';
import { Route, Switch, Redirect} from 'react-router-dom';
import TagsIndex from './tags_index_container';

const Home = () => (
        <div className="HomeScreen">
           <Route path="/home" component={HomeSidebar} />
           <Route path="/home/tags" component={TagsIndex}/>
            <Switch>
                <Route path="/home/notes/:noteId" exact component={NoteIndex} />
                <Route path="/home/notes" component={NoteIndex} />
            </Switch>
            <Switch>
                <Route path="/home/trash/:noteId" exact component={Trash} />
                <Route path="/home/trash" component={Trash} />
            </Switch>
        </div>
        );




export default Home;


