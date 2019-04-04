import React from 'react';
import ReactQuill from 'react-quill';
import { merge } from 'lodash';

class NoteEditor extends React.Component{

    constructor(props){
        super(props);
        // this.updateNote = this.updateNote.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSave = this.handleSave.bind(this);
        // this.collectNotebook = this.collectNotebook.bind(this);
    }

    render(){
        const toolbar = [
            [{ 'font': [] }],
            ['italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],

            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],

            ['clean']
        ];
        return(
            <>
            <ReactQuill />
            </>
        )
    }

}

export default NoteEditor;