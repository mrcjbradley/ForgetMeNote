import React from 'react';
import { connect } from 'react-redux';
import { getNote, patchNote } from '../../../actions/note_actions';
import { Link } from 'react-router-dom';

class NoteDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = this.props.note;
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidMount(){
        // if (oldProps.noteId !== newProps.noteId){
        const { getNote, noteId } = this.props;
        getNote(noteId).then(({note})=> {
            this.setState(note);
            // debugger
        });
        // }
    }

    componentDidUpdate(prevProps, prevState){
        const { getNote, noteId, note } = this.props;
        if (prevProps.noteId !== noteId){
            this.setState(note);
            // debugger
        };
    }

    handleChange(field){
        return e => {
            this.setState({[field]: e.target.value});
        };
    }

    handleBlur(e){
        const { patchNote } = this.props;
        patchNote(this.state);
    }

    toggleDisabled(klass){
        return e => {
       $(`.${klass}`).removeAttr('disabled').focus();
        };
    } 

    render(){
        // debugger
        const { title, content } = this.state;
        // debugger
        return(
            <article className="NoteShow" >
                <form className="NoteShow_NoteForm">
                    <div className="NoteDetail_NoteHeader">
                        <nav className="NoteDetail_NoteHeaderNav">
                            <nav className="NoteHeaderNav_left">
                                <div className="NoteHeaderNav_Expand"></div>
                                <Link to="#" className="NoteHeaderNav_NoteBookLink"> <span className="bg--notebook-icon"></span>First Notebook</Link>
                            </nav>
                            <div className="NoteHeaderNav_MoreOptions">...</div>
                        </nav>
                        <div className="NoteShow_ToolBar"></div>
                        <div className="NoteDetail_DisableWrapper" onClick={this.toggleDisabled("NoteDetail_NoteTitle")}>
                            <input type="text" 
                                className="NoteDetail_NoteTitle" 
                                onChange={this.handleChange('title')} 
                                value={title} 
                                disabled
                                onBlur={this.handleBlur}
                            />
                        </div>
                    </div>
                    <div className="NoteDetail_DisableWrapper" onClick={this.toggleDisabled("NoteDetail_NoteContent")}>
                        <textarea 
                        className="NoteDetail_NoteContent" 
                        onChange={this.handleChange('content')} 
                        value={content} 
                        disabled
                        onBlur={this.handleBlur}>
                        </textarea>
                    </div>
                </form>
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
    getNote: noteId => dispatch(getNote(noteId)),
    patchNote: noteId => dispatch(patchNote(noteId))
})


export default connect(msp, mdp)(NoteDetail);