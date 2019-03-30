import React from 'react';
import { logOut } from '../../actions/session_actions';
import HomeSidebar from './home_sidebar';
import NoteIndex from './note_index';
import { connect } from 'react-redux';

export default () => {
        return(
        <div className="HomeScreen">
            <HomeSidebar />
            <NoteIndex />
            <article className="NoteShow">
                 Welcome to the note section! This is just some temporary content 
            </article>   
        </div>
        );
    
}

