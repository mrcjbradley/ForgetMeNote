import React from 'react';
import { keys } from 'lodash';
import { Link } from 'react-router-dom';
import Modal from './modal_container';
import TagOptionsMenu from './tag_options';

class TagsIndex extends React.Component {
    constructor(props){
        super(props);
        this.handleNewTag = this.handleNewTag.bind(this);
        this.handleUpdateTag = this.handleUpdateTag.bind(this);
        this.handleDeleteTag = this.handleDeleteTag.bind(this);
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

    handleSubmit(formType){
        const { postTag, patchTag, deleteTag } = this.props;
        let submitAction;
        let payLoad;
        switch (formType) {
            case "Create new tag":
                submitAction = postTag;
                payLoad = { title: this.state.name };
                break;
            case "Rename tag":
                submitAction = patchTag;
                payLoad = Object.assign({}, this.selectedTag, { title: this.state.name });
                break;
            case "Delete tag":
                submitAction = deleteTag;
                payLoad = this.selectedTag.id;
                break;
            default: 
                break;
        };
        // const submitAction = formType ===  ? postTag : patchTag;
        // const payLoad = formType === "Create new tag" ? { title: this.state.name } : Object.assign({}, this.selectedTag, { title: this.state.name });
        return e => {
            e.preventDefault();
            // debugger
            return submitAction(payLoad);
        };
    }

    handleNewTag(){
        const { openModal } = this.props;
        const modal = {
            title: 'Create new tag',
            content: (
                <label key={"createTagName"}> Name
                <form className="NewTagForm">
                    <input type="text" className="NewTagForm_TagName" id='js-nameField'  onChange={this.handleChange}/>
                </form>
                </label>
            ),
            buttonType: 'cancel done'
        };
        openModal(modal);
    }


    handleUpdateTag(){
        const { openModal } = this.props;
        const modal = {
            title: 'Rename tag',
            content: (
                <label key={new Date()}> Name
                <form className="RenameTagForm">
                    <input type="text" className="RenameTagForm_TagName" id='js-nameField'  onChange={this.handleChange}/>
                </form>
                </label>
            ),
            buttonType: 'cancel done'
        };
        // console.log(this.state.tagOptionMenu);
        // debugger
        this.setState({ tagOptionMenu: false });//.then(() => 
        openModal(modal);
        // console.log(this.state.tagOptionMenu);
    }

    handleDeleteTag(){
        const { openModal } = this.props;
        const modal = {
            title: 'Delete tag',
            content: (
                `${this.selectedTag.title} tag will be deleted and removed from all notes. This action can not be undone.`
            ),
            buttonType: 'cancel delete'
        };
        // console.log(this.state.tagOptionMenu);
        // debugger
        this.setState({ tagOptionMenu: false });//.then(() => 
        openModal(modal);
        // console.log(this.state.tagOptionMenu);
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
                {this.state.tagOptionMenu ? <TagOptionsMenu toggleTagOptionsDisplay={this.toggleTagOptionsDisplay(null)} tag={this.selectedTag} pos={this.optionsPos} handleUpdateTag={this.handleUpdateTag} handleDeleteTag={this.handleDeleteTag} /> : null}
                {this.props.open ? <Modal handleSubmit={this.handleSubmit}/> : null} 
            </>
        );
    }
}

export default TagsIndex;


