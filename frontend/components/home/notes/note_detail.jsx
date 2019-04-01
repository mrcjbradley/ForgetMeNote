import React from 'react';
import { connect } from 'react-redux';
import { getNote } from '../../../actions/note_actions';

class NoteDetail extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        // if (oldProps.noteId !== newProps.noteId){
        const { getNote, noteId } = this.props;
        getNote(noteId);
        // }
    }

    // componentDidUpdate(oP, nP){

    // }

    render(){
        // debugger
        const { title, content } = this.props.note;
        // debugger
        return(
            <article className="NoteShow">
                <h3>{title}</h3>
            </article>
        );
    }
}


const msp = ({entities: {notes}}, {match:{params:{noteId}}}) => {
    // debugger
    const note = notes[noteId]; // || {title: null, content: null};
    return { note: note ? note : { title: '', content: '' }, noteId }
};

const mdp = dispatch => ({
    getNote: noteId => dispatch(getNote(noteId))
})


export default connect(msp, mdp)(NoteDetail);