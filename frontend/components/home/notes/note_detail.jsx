import React from 'react';
import { Link } from 'react-router-dom';
import { merge } from 'lodash';
import Modal from '../modal';
import NoteEditor from './editor';

class NoteDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = this.props.note;
        this.handleBlur = this.handleBlur.bind(this);
        this.toggleFullScreen = this.toggleFullScreen.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
        this.handleRestoreNote = this.handleRestoreNote.bind(this);
    }

    componentDidMount(){
        if (this.props.note){
        const { getNote, note } = this.props;
        getNote(note.id); 
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.note !== this.props.note){
            this.setState(this.props.note);
        }
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

    toggleFullScreen(e){
        
        e.preventDefault();
        this.props.toggleFullScreen();
        $('.js-expand-icon').toggleClass('green');
        $('.userNav_toggleMenu').toggle().delay(1000);
    }

    toggleMoreMenu(e){
        e.preventDefault();
        $('.js-more-menu').toggle();
    }

    handleDeleteNote(e){
        const modal = {
            title: 'Delete note',
            content: `${this.props.note.title} will be moved to trash.`,
        };
        this.props.openModal(modal);
    }

    handleRestoreNote(e){
        const { patchNote, note, history, noteId } = this.props;
        const restoredNote = merge({}, note, {deleted_at: null});
        patchNote(restoredNote).then(() => history.push(`/home/notes/`) );
    }

render(){
    if (!this.props.note) return null;
    
    const { title, content } = this.state;
    const { deleted_at } = this.props.note;
    const isDeleted = Boolean(typeof deleted_at === 'string');
    const nbQuickLink = (<div className="NoteHeaderNav_NoteBookLinkWrapper">
    <div className="bg--notebook-icon"></div>
        <Link to="#" className="NoteHeaderNav_NoteBookLink">First Notebook</Link>
    </div>)
    
    return(
        <>
        <article className="NoteShow" >
            <form className="NoteShow_NoteForm">
                <div className="NoteDetail_NoteHeader">
                    <nav className="NoteDetail_NoteHeaderNav">
                        <nav className="NoteHeaderNav_left">
                            <Link to="#" className="bg--expand-icon js-expand-icon" onClick={this.toggleFullScreen}></Link>
                            { isDeleted ? '' : nbQuickLink }
                        </nav>
                        <nav className="NoteHeaderNav_MoreOptions" style={this.props.note.id === -1 ? { display: 'none'}: null }>
                            <Link to="#" onClick={this.toggleMoreMenu}>
                                <div className="bg--more-icon"> </div>
                            </Link>
                            <div style={{ display: 'none' }} onClick={this.toggleMoreMenu} className="clickOutWrapper js-more-menu">
                                <ul className="MoreOptions_DropDown">
                                    <li className="MoreOption" onClick={ isDeleted ? this.handleRestoreNote : this.handleDeleteNote}>
                                    
                                            {isDeleted ? "Restore note" : "Delete note"}
                                    
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </nav>
                    <div className="NoteShow_ToolBar"></div>
                    <div className="NoteDetail_DisableWrapper" onClick={ isDeleted ?  null : this.toggleDisabled("NoteDetail_NoteTitle")}>
                        <input type="text" 
                            className="NoteDetail_NoteTitle" 
                            onChange={this.handleChange('title')} 
                            value={title ? title : ''} 
                            disabled
                            onBlur={this.handleBlur}
                        />
                    </div>
                </div>
                {/* <div className="NoteDetail_DisableWrapper" onClick={isDeleted ? null : this.toggleDisabled("NoteDetail_NoteContent")}>
                    <textarea 
                    className="NoteDetail_NoteContent" 
                    onChange={this.handleChange('content')} 
                    value={content ? content : ''} 
                    disabled
                    onBlur={this.handleBlur}>
                    </textarea>
                </div> */}
                <NoteEditor 
                className="NoteDetail_NoteContent" 
                noteContent={content ? content : ''}
                
                         />
            </form>
        </article>
        <Modal note={this.props.note} />
        </>
    );
}
}

export default NoteDetail;