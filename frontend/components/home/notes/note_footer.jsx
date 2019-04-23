import React from 'react';
import { connect } from 'react-redux';

class NoteFooter extends React.Component {
    constructor(props){
        super(props);
        this.state = {title: ""};
    }

    render(){


        return(
            <div className="NoteFooterContainer">
                <div className="NoteFooter">
                    <div className="bg--newnote-grey-icon"></div>
                    <div className="NoteTagsContainer">
                        <div className="NoteTags">Note's current tags will go here</div>
                        <input type="text" value={this.state.title}/>
                    </div>
                </div>            
            </div>
        )
    }
}

export default NoteFooter;