import React from 'react';
import { keys } from 'lodash';
import { Link } from 'react-router-dom';
import Modal from './modal_container';

class TagsIndex extends React.Component {
    constructor(props){
        super(props);
        this.handleNewTag = this.handleNewTag.bind(this);
        this.state = { name: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTagClick = this.handleTagClick.bind(this);
    }

    componentDidMount(){
        const { fetchAllTags } = this.props;
        fetchAllTags();
    }

    handleTagClick(tagId){
        const { receiveFilter } = this.props;
        return e => {
            e.preventDefault();
            receiveFilter({tags: tagId});
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
                        <li className="LetterListItem" key={tidx} onClick={this.handleTagClick(tag.id)}>{tag.title}  <div className="NoteCount">
                            ({tag.note_ids.length})
                        </div></li>
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
            {this.props.open ? <Modal handleSubmit={this.handleSubmit}/> : null} 
            </>
        );
    }
}

export default TagsIndex;


