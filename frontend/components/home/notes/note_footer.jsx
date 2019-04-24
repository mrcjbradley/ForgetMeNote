import React from 'react';
import { connect } from 'react-redux';
import { values } from 'lodash';
import {
    removeAllNotesFromTag,
    removeExistingTagging,
    postNewTagging
} from '../../../actions/tagging_actions';
import { postTag } from '../../../actions/tag_action';
import FooterTagOptionsMenu from '../footer_tag_options';
import { openModal } from '../../../actions/ui_actions';

class NoteFooter extends React.Component {
    constructor(props){
        super(props);
        this.state = {title: "", tagSearchMatches:[], tagOptionsVisible: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleNewTagging = this.handleNewTagging.bind(this);
        this.toggleTagOptionsVisible = this.toggleTagOptionsVisible.bind(this);
        // this.handleRemoveAllNotesFromTag = this.handleRemoveAllNotesFromTag.bind(this);
        this.handleNewTagAndTagging = this.handleNewTagAndTagging.bind(this);
        this.optionsPos = [0,0];
    }

    toggleTagOptionsVisible(tag){
       
        return (e) => {
       
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
       
        if (this.state.tagSearchMatches.length > 0 ) {
            document.querySelector('.tag-search-results').style.left = `${searchOffset}px`;
        }
    }

    handleNewTagging(e){
       
        e.preventDefault();
        const { postNewTagging } = this.props;
        const tag_id = e.target.tagName === "INPUT" ? this.props.tags.filter(tag => tag.title === e.target.value)[0].id : e.target.value;
        const tagging = { note_id: this.props.displayedNote.id, tag_id: tag_id };
        this.setState({ title: "", tagSearchMatches: []});
        postNewTagging(tagging);
    }
    
    handleChange(e){
        e.preventDefault();
        const titleLength = this.state.title.length;
       
        const tagSearchMatches = titleLength > 0 ? this.props.tags.filter(tag => !this.props.currentNoteTags.includes(tag) && tag.title.slice(0, titleLength + 1) === e.target.value) : [];
       
        this.setState({title: e.target.value, tagSearchMatches});
    }

    handleNewTagAndTagging(){

        const note = this.props.displayedNote;
        const currentTagTitles = this.props.currentNoteTags.map(tag => tag.title);
        const tagSearchTitles = this.state.tagSearchMatches.map (tag => tag.title);
        return (e) => {
            e.preventDefault();
        if (tagSearchTitles.includes(e.target.value)) {
            this.handleNewTagging(e);
        } else if (!currentTagTitles.includes(e.target.value)) {
            this.props.postTag({title: e.target.value, note_id: note.id}). then(res => {
               
                // this.props.history.push(`/home/notes/${res.tag.note_ids[0]}`);
                this.setState({ title: "", tagSearchMatches: []});
                this.props.getNote(res.tag.note_ids[0]);
            });
        }

    };}


    render(){
    
    const { currentNoteTags , displayedNote} = this.props;
    const { tagSearchMatches, tagOptionsVisible } = this.state;
    const tagList = currentNoteTags.map((tag,idx) => {
        if (tag){
        return(
        <li className={`NoteFooter-TagListItem tag-${tag.id}`} key={idx} ><div className="TagDetailWrapper">
                            {tag.title}
                        </div>
                            <div className="NoteIndex_NoteTagsOptions">
                                <nav className="NoteIndex_NoteOptions">
                                    <div onClick={this.toggleTagOptionsVisible(tag)} className="bg--tag-dd-options note-detail">^</div>
                                </nav>
                            </div>
                        </li>
                )}})
        
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
                        <input type="text" 
                            value={this.state.title} 
                            onChange={this.handleChange} 
                            onBlur={this.handleNewTagAndTagging()}
                            placeholder={this.props.currentNoteTags.length > 0 ? "" : "Add tag" }/>
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
    const { currentNoteTagIds, displayedNote, history } = ownProps;
   
    const currentNoteTags = ownProps.currentNoteTagIds.map(tag_id => tags[tag_id]).filter(el => el !== undefined);
    
    return ({
        currentNoteTags,
        tags: _.values(tags) ,
        displayedNote,
        history
    })
}

const mdp = dispatch => ({
    postNewTagging: tagging => dispatch(postNewTagging(tagging)),
    removeExistingTagging: tagging => dispatch(removeExistingTagging(tagging)),
    openModal: modal => dispatch(openModal(modal)),
    postTag: tag => dispatch(postTag(tag))
});

export default connect(msp, mdp)(NoteFooter);