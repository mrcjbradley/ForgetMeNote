import React from 'react';
import TimeAgo from 'react-timeago';


class NoteIndexItem extends React.Component {
    
    previewGenerator(content){
        const charCount = content.length;
        if (charCount <= 75)
        {
            return content;
        } else
        {
            return content.slice(0, 75) + '...';
        }
    }

    render(){
        const { note } = this.props;
        return(
            <li className="NoteItem">
                <div className="NoteItem_NoteTitle">
                    {note.title}
                </div>
                <div className="NoteItem_NoteContent">
                    {this.previewGenerator(note.content)}
                </div>
                <div className="NoteItem_NoteUpdated">
                    <TimeAgo date={note.updated_at} />
                </div>
            </li>
        )
    }
}

export default NoteIndexItem;