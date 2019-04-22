import React from 'react';
import { keys } from 'lodash';
import { Link } from 'react-router-dom';
import Modal from './modal_container';
import TagOptionsMenu from './tag_options';

class TagsIndex extends React.Component {
    constructor(props){
        super(props);
        this.handleNewTag = this.handleNewTag.bind(this);
        this.state = { name: '', tagOptionMenu: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTagClick = this.handleTagClick.bind(this);
        this.toggleTagOptionsDisplay = this.toggleTagOptionsDisplay.bind(this);
        this.optionsPos = [0,0];
    }

    componentDidMount(){
        const { fetchAllTags } = this.props;
        fetchAllTags();
    }

    toggleTagOptionsDisplay(tag){
        return (e) => {
        this.setState({ tagOptionMenu: !this.state.tagOptionMenu });
        // debugger
        if (e.clientX && e.clientY){this.optionsPos = [e.clientX, e.clientY];}
        if (tag){this.selectedTag = tag;}
        // debugger
        };
    }

    handleTagClick(tagId){
        const { receiveFilter, history } = this.props;
        return e => {
            e.preventDefault();
            receiveFilter({tags: tagId}).then(history.push('/home/notes'));
        };
    }

    handleChange(e){
        this.setState({name: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        const { postTag } = this.props;
        return postTag({title: this.state.name});
    }

    handleNewTag(){
        const { openModal } = this.props;
        const modal = {
            title: 'Create new tag',
            content: (
                <label> Name
                <form className="NewTagForm">
                    <input type="text" className="NewTagForm_TagName" id='js-nameField'  onChange={this.handleChange}/>
                </form>
                </label>
            ),
            buttonType: 'cancel done'
        };
        openModal(modal);
    }

    render(){
        const tagKeys = _.keys(this.props.tags);
        const tagList = tagKeys.map((key,idx) => {
            if(this.props.tags[key].length > 0){
                const tagItems = this.props.tags[key].map((tag, tidx) => {
                    return(
                        <li className={`LetterListItem tag-${tag.id}`} key={tidx} ><div onClick={this.handleTagClick(tag.id)} className="TagDetailWrapper">
                            {tag.title}  <div className="NoteCount">
                                ({tag.note_ids.length}) </div>
                        </div>
                            <div className="NoteIndex_NoteTagsOptions">
                                <nav className="NoteIndex_NoteOptions">
                                    <div onClick={this.toggleTagOptionsDisplay(tag)} className="bg--tag-dd-options">^</div>
                                    
                                </nav>
                            </div>
                        </li>
                    )
                });
            
                return(
                <li key={idx} className={"LetterList "+ key}> 
                <div className="LetterList_Header">
                    {key.toUpperCase()}
                </div>
                <ul key={key}>
                    {tagItems}
                </ul>
            </li>)
            }
        });
        return( 
            <>
            <section className="TagsIndex">
                <div className="TagsIndex_TagHeader">
                    <h1 className="TagsHeader_TagsTitle">Tags</h1>
                    <Link to="#" onClick={this.handleNewTag} className="TagsHeader_NewTagButton">
                    <div className="bg--new-tag-icon"></div>
                    New Tag</Link>
                </div>
                <div className="TagsIndex_Body">
                    <ul>
                        {tagList}
                    </ul>
                </div>
            </section>
                {this.state.tagOptionMenu ? <TagOptionsMenu toggleTagOptionsDisplay={this.toggleTagOptionsDisplay(null)} tag={this.selectedTag} pos={this.optionsPos} /> : null}
                {this.props.open ? <Modal handleSubmit={this.handleSubmit}/> : null} 
            </>
        );
    }
}

export default TagsIndex;


