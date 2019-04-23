import React from 'react';
import { connect } from 'react-redux';

class NoteFooter extends React.Component {
    constructor(props){
        super(props);
        this.state = {title: ""};
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e){
    	e.preventDefault();
    	this.setState({title: e.target.value});
    }

    render(){
    
    const { currentNoteTags } = this.props;
    
    const tagList = currentNoteTags.map((tag,idx) => (
                        <li className={`LetterListItem tag-${tag.id}`} key={idx} ><div className="TagDetailWrapper">
                            {tag.title}
                        </div>
                            <div className="NoteIndex_NoteTagsOptions">
                                <nav className="NoteIndex_NoteOptions">
                                    <div onClick={()=> {console.log('clicked')}} className="bg--tag-dd-options">x</div>
                                </nav>
                            </div>
                        </li>
                ))
            

        return(
            <div className="NoteFooterContainer">
                <div className="NoteFooter">
                    <div className="bg--newnote-grey-icon"></div>
                    <div className="NoteTagsContainer">
                        <div className="NoteTags">
                        	<ul>
                        		{tagList}
                        	</ul>
                        </div>
                        <input type="text" value={this.state.title} onChange={this.handleChange}/>
                    </div>
                </div>            
            </div>
        )
    }
}

// export default NoteFooter;

const msp = ( state, ownProps) => {
    const { entities: { tags } } = state;
    const { currentNoteTagIds } = ownProps;
    // debugger
    const currentNoteTags = currentNoteTagIds.map(tag_id => tags[tag_id]);
    return ({
        currentNoteTags,
        tags
    })
}

const mdp = dispatch => ({

});

export default connect(msp, mdp)(NoteFooter);