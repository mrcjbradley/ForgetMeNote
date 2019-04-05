import React from 'react';
import { Link } from 'react-router-dom';
import { merge } from 'lodash';
import Modal from '../modal';
import ReactQuill from 'react-quill';


class NoteDetail extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = this.props.note;
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.toggleFullScreen = this.toggleFullScreen.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
        this.handleRestoreNote = this.handleRestoreNote.bind(this);
    }

    componentDidMount()
    {
        if (this.props.note)
        {
            const { getNote, note } = this.props;
            getNote(note.id);
        }
    }

    componentDidUpdate(prevProps, prevState)
    {
        if (prevProps.note !== this.props.note)
        {
            this.setState(this.props.note);
        }
    }

    handleChange(field)
    {

        return e =>
        {
            this.setState({ [field]: e.target.value });
        };
    }

    handleBlur(e)
    {
        // debugger
        const { patchNote } = this.props;
        setTimeout(() => patchNote(this.state), 1000);
    }

    // toggleDisabled(klass){
    //     return e => {
    //    $(`.${klass}`).removeAttr('disabled').focus();

    //     };
    // } 

    displayTools(e)
    {
        $('#tool').css("display", "inherit");
    }

    toggleFullScreen(e)
    {

        e.preventDefault();
        this.props.toggleFullScreen();
        $('.js-expand-icon').toggleClass('green');
        $('.userNav_toggleMenu').toggle().delay(1000);
    }

    toggleMoreMenu(e)
    {
        e.preventDefault();
        $('.js-more-menu').toggle();
    }

    handleEditorChange(value, delta, source, editor)
    {
        this.setState({ content: value, plain_text: editor.getText() });

    }

    handleDeleteNote(e)
    {
        const modal = {
            title: 'Delete note',
            content: `${this.props.note.title} will be moved to trash.`,
        };
        this.props.openModal(modal);
    }

    handleRestoreNote(e)
    {
        const { patchNote, note, history, noteId } = this.props;
        const restoredNote = merge({}, note, { deleted_at: null });
        patchNote(restoredNote).then(() => history.push(`/home/notes/${note.id}`));
    }

    render()
    {
        if (!this.props.note) return null;

        const { title, content } = this.state;
        const { deleted_at } = this.props.note;
        const isDeleted = Boolean(typeof deleted_at === 'string');
        const nbQuickLink = (
            <div className="NoteHeaderNav_NoteBookLinkWrapper">
                <div className="bg--notebook-icon"></div>
                <Link to="#" className="NoteHeaderNav_NoteBookLink">First Notebook</Link>
            </div>
        )

        return (
            <>
                <article className="NoteShow" >
                    <form className="NoteShow_NoteForm">
                        <div className="NoteDetail_NoteHeader">
                            <nav className="NoteDetail_NoteHeaderNav">
                                <nav className="NoteHeaderNav_left">
                                    <Link to="#" className="bg--expand-icon js-expand-icon" onClick={this.toggleFullScreen}></Link>
                                    {isDeleted ? '' : nbQuickLink}
                                </nav>
                                <nav className="NoteHeaderNav_MoreOptions" style={this.props.note.id === -1 ? { display: 'none' } : null}>
                                    <Link to="#" onClick={this.toggleMoreMenu}>
                                        <div className="bg--more-icon"> </div>
                                    </Link>
                                    <div style={{ display: 'none' }} onClick={this.toggleMoreMenu} className="clickOutWrapper js-more-menu">
                                        <ul className="MoreOptions_DropDown">
                                            <li className="MoreOption" onClick={isDeleted ? this.handleRestoreNote : this.handleDeleteNote}>

                                                {isDeleted ? "Restore note" : "Delete note"}

                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </nav>
                            {/* <span className="BlurSave" onBlur={this.handleBlur}> */}
                            <div className="spacerForToolBar">
                                <div className="NoteShow_ToolBar" id="tool" style={{ display: 'none' }}>
                                    <span className="ql-formats">
                                        <select className="ql-font"></select>
                                        <select className="ql-size"></select>
                                        <select className="ql-color"></select>
                                    </span>
                                    <span className="ql-formats">
                                        <button className="ql-bold"></button>
                                        <button className="ql-italic"></button>
                                        <button className="ql-underline"></button>
                                        <button className="ql-strike"></button>
                                        <select className="ql-background"></select>
                                        <button className="ql-code-block"></button>
                                    </span>
                                    <span className="ql-formats">
                                        <button className="ql-list" value="ordered"></button>
                                        <button className="ql-list" value="bullet"></button>
                                    </span>
                                    <span className="ql-formats"><button className="ql-link"></button></span>
                                    <span className="ql-formats">
                                        <select className="ql-align"></select>
                                        <button className="ql-indent" value="-1" />
                                        <button className="ql-indent" value="+1" />
                                    </span>
                                    <span className="ql-formats">
                                        <button className="ql-script" value="sub"></button>
                                        <button className="ql-script" value="super"></button>
                                    </span>
                                    <span className="ql-formats">
                                        <button className="ql-clean"></button>
                                    </span>
                                </div>
                            </div>
                            {/* onClick={isDeleted ? null : this.toggleDisabled("NoteDetail_NoteTitle")}  */}
                            <div className="NoteDetail_DisableWrapper" onBlur={this.handleBlur} >
                                <input type="text"
                                    className="NoteDetail_NoteTitle"
                                    onChange={this.handleChange('title')}
                                    value={title ? title : ''}
                                    disabled={isDeleted ? true : false}
                                    onFocus={() => $('#tool').css("display", "none")}
                                />
                                <div onClick={isDeleted ? null : this.displayTools}>
                                    <ReactQuill
                                        modules={{ toolbar: { container: '#tool' } }}
                                        // hideToolBar={viewOnly}
                                        className="NoteDetail_NoteContent"
                                        value={content || ''}
                                        readOnly={isDeleted}
                                        // onBlur={this.handleBlur}
                                        onChange={this.handleEditorChange}
                                    />
                                </div>
                            </div>
                            {/* </span> */}
                        </div>


                    </form>
                </article>
                <Modal note={this.props.note} notes={this.props.notes} />
            </>
        );
    }
}
export default NoteDetail;