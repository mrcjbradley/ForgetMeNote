import React from 'react';
import { connect } from 'react-redux';
// import { patchTag, deleteTag } from '../../actions/tag_action';
import { removeExistingTagging } from '../../actions/tagging_actions';
import { receiveFilter } from '../../actions/ui_actions';
import { withRouter } from 'react-router-dom';

class FooterTagOptionsMenu extends React.Component {

    constructor(props){
        super(props);
        
        this.handleRemoveCurrentTagging = this.handleRemoveCurrentTagging.bind(this);
        this.handleTagClick = this.handleTagClick.bind(this);
        
    }

    componentDidMount(){
            
    }

    handleMouseEnter(e) {
        $(e.target).addClass('grey');
    }

    handleMouseLeave(e) {
        $(e.target).removeClass('grey');
    
    }

    handleTagClick(e){
    
        
        e.preventDefault();
        const { receiveFilter, history, toggleTagOptionsVisible, tag} = this.props;
            receiveFilter({tags: tag.id});
            toggleTagOptionsVisible()(e);
            history.push('/home/notes');

        
    }

    handleRemoveCurrentTagging(e){
        const { removeExistingTagging, tag, toggleTagOptionsVisible, note } = this.props;
        toggleTagOptionsVisible()(e);
        removeExistingTagging({tag_id: tag.id, note_id: note.id });
    }

   

render() {
    
    const { toggleTagOptionsVisible, pos, tag, handleRemoveAllNotesFromTag } = this.props;
    const top = window.innerHeight - pos[1] > 150 ? `${pos[1] + 13}px` : `${pos[1] - 125}px`;
    const left = `${window.innerWidth - pos[0] - 8}px`;
    const styleObj = {'--tag-options-x': left, '--tag-options-y': top };
    
    return (
        <>
            <div className="clickOutWrapper" onClick={toggleTagOptionsVisible(tag)}>
        </div>
            <ul className="TagOptions NoteFooterTagOptions" style={styleObj}>
                <li className="SortByOption"
                    onMouseEnter={this.handleMouseEnter}
                    onClick={ this.handleTagClick }
                    onMouseLeave={this.handleMouseLeave}
                    >
                   Filter by tag
            
                </li>
                <li className="SortByOption"
                    onMouseEnter={this.handleMouseEnter}
                    onClick={this.handleRemoveCurrentTagging}
                    onMouseLeave={this.handleMouseLeave}>
                   Remove tag
            
                </li>
               
            </ul>
        </>
    )
}
};


const msp = (state, { tag, toggleTagOptionsVisible, history, handleRemoveAllNotesFromTag, note }) => ({
    tag,
    toggleTagOptionsVisible,
    handleRemoveAllNotesFromTag,
    history,
    note
});

const mdp = dispatch => ({
    receiveFilter: filter => dispatch(receiveFilter(filter)),
    removeExistingTagging: tagging => dispatch(removeExistingTagging(tagging))
});
const connectedComp = connect(msp, mdp)(FooterTagOptionsMenu);
export default withRouter(connectedComp);

