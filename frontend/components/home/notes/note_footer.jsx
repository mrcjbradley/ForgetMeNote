import React from 'react';
import { connect } from 'react-redux';
import { values } from 'lodash';
import {
    removeAllNotesFromTag,
    removeExistingTagging,
    postNewTagging
} from '../../../actions/tagging_actions';
import FooterTagOptionsMenu from '../footer_tag_options';
import { openModal } from '../../../actions/ui_actions';
import { timingSafeEqual } from 'crypto';

class NoteFooter extends React.Component {
    constructor(props){
        super(props);
        this.state = {title: "", tagSearchMatches:[], tagOptionsVisible: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleNewTagging = this.handleNewTagging.bind(this);
        this.toggleTagOptionsVisible = this.toggleTagOptionsVisible.bind(this);
        // this.handleRemoveAllNotesFromTag = this.handleRemoveAllNotesFromTag.bind(this);
        this.optionsPos = [0,0];
    }

    toggleTagOptionsVisible(tag){
        // debugger
        return (e) => {
        // debugger
            this.setState({ tagOptionsVisible: !this.state.tagOptionsVisible });
        if (e.clientX && e.clientY){this.optionsPos = [e.clientX, e.clientY];}
        if (tag){
            this.selectedTag = tag;
            this.setState({name: tag.title});
        }
        };
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
        const tagging = { note_id: this.props.displayedNote.id, tag_id: e.target.value };
        this.setState({ title: "", tagSearchMatches: []});
        postNewTagging(tagging);
    }
    
    handleChange(e){
        e.preventDefault();
        console.log(e.target.value);
        const titleLength = this.state.title.length;
        // debugger
        const tagSearchMatches = titleLength > 0 ? this.props.tags.filter(tag => !this.props.currentNoteTags.includes(tag) && tag.title.slice(0, titleLength + 1) === e.target.value) : [];
        console.log(tagSearchMatches);
        this.setState({title: e.target.value, tagSearchMatches});
    }

    render(){
    
    const { currentNoteTags , displayedNote} = this.props;
    const { tagSearchMatches, tagOptionsVisible } = this.state;
    const tagList = currentNoteTags.map((tag,idx) => (
        <li className={`NoteFooter-TagListItem tag-${tag.id}`} key={idx} ><div className="TagDetailWrapper">
                            {tag.title}
                        </div>
                            <div className="NoteIndex_NoteTagsOptions">
                                <nav className="NoteIndex_NoteOptions">
                                    <div onClick={this.toggleTagOptionsVisible(tag)} className="bg--tag-dd-options note-detail">^</div>
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
                       { tagOptionsVisible ? <FooterTagOptionsMenu 
                            toggleTagOptionsVisible={this.toggleTagOptionsVisible}
                            tag={this.selectedTag} pos={this.optionsPos}
                            // handleRemoveAllNotesFromTag={this.handleRemoveAllNotesFromTag}
                            note={displayedNote}
                       />: null }
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
    // removeAllNotesFromTag: tagId => dispatch(removeAllNotesFromTag(tagId)),
    openModal: modal => dispatch(openModal(modal))
});

export default connect(msp, mdp)(NoteFooter);