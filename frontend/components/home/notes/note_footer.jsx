import React from 'react';
import { connect } from 'react-redux';
import { values } from 'lodash';
import {
    removeAllNotesFromTag,
    removeExistingTagging,
    postNewTagging
} from '../../../actions/tagging_actions';

class NoteFooter extends React.Component {
    constructor(props){
        super(props);
        this.state = {title: "", tagSearchMatches:[]};
        this.handleChange = this.handleChange.bind(this);
        this.handleNewTagging = this.handleNewTagging.bind(this);
    }

    componentDidUpdate(){
        const searchOffset = document.querySelector('.NoteTagsContainer input') ? document.querySelector('.NoteTagsContainer input').offsetLeft : 0;         
        if (this.state.tagSearchMatches.length > 1 ) {
            document.querySelector('.tag-search-results').style.left = `${searchOffset}px`;
        }
    }

    handleNewTagging(e){
        e.preventDefault();
        const { postNewTagging } = this.props;
        postNewTagging({note_id: this.props.displayedNote.id, tag_id: e.target.value});
    }
    
    handleChange(e){
        e.preventDefault();
        console.log(e.target.value);
        const titleLength = this.state.title.length;
        // debugger
        const tagSearchMatches = titleLength > 0 ? this.props.tags.filter(tag => tag.title.slice(0, titleLength + 1) === e.target.value) : [];
        console.log(tagSearchMatches);
        this.setState({title: e.target.value, tagSearchMatches});
    }

    render(){
    
    const { currentNoteTags } = this.props;
    const { tagSearchMatches } = this.state;
    const tagList = currentNoteTags.map((tag,idx) => (
        <li className={`NoteFooter-TagListItem tag-${tag.id}`} key={idx} ><div className="TagDetailWrapper">
                            {tag.title}
                        </div>
                            <div className="NoteIndex_NoteTagsOptions">
                                <nav className="NoteIndex_NoteOptions">
                                    <div onClick={()=> {console.log('clicked')}} className="bg--tag-dd-options note-detail">^</div>
                                </nav>
                            </div>
                        </li>
                ))
        
        const tagSearchResults = tagSearchMatches.map((tag,idx) => (
            <li value={tag.id} key={idx} onClick={this.handleNewTagging} className="tagSearchOption">
                {tag.title}
            </li>
        ));
        const tagSelectElement = (
            <ul className="tag-search-results" >
                {tagSearchResults}
            </ul>
        );
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
                        <input type="text" value={this.state.title} onChange={this.handleChange} placeholder={this.props.currentNoteTags.length > 0 ? "" : "Add tag" }/>
                       {tagSearchMatches.length > 0 ? tagSelectElement : null }
                    </div>
                </div>            
            </div>
        )
    }
}

// export default NoteFooter;

const msp = ( state, ownProps) => {
    const { entities: { tags } } = state;
    const { currentNoteTagIds, displayedNote } = ownProps;
    // debugger
    const currentNoteTags = currentNoteTagIds.map(tag_id => tags[tag_id]);
    return ({
        currentNoteTags,
        tags: _.values(tags) ,
        displayedNote
    })
}

const mdp = dispatch => ({
    postNewTagging: tagging => dispatch(postNewTagging(tagging)),
    removeExistingTagging: tagging => dispatch(removeExistingTagging(tagging)),
    removeAllNotesFromTag: tagId => dispatch(removeAllNotesFromTag(tagId))
});

export default connect(msp, mdp)(NoteFooter);