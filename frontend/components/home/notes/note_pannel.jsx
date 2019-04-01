import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import NoteDetail from './note_detail';

class NotePannel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { currentNoteId, history } = this.props;
        return (
            <article className="NoteShow">
                {/* <Route path="/home" exact render={() => {
                    return currentNoteId ?  history.push(`/home/notes/${currentNoteId}`) : null ;
                }}/> */}
               <Route path="/home/notes/:noteId" component={NoteDetail} />
            </article>
        );
    }
}


const msp = ({ui: { currentNoteId }},{match: {path, url}, history }) => {
    // debugger
    return ({
        currentNoteId,
        history
    })
};

const mdp = dispatch => ({
})


export default connect(msp, mdp)(NotePannel);