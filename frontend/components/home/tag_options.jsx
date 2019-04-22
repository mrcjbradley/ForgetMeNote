import React from 'react';
import { connect } from 'react-redux';
import { patchTag, deleteTag } from '../../actions/tag_action';
import {withRouter} from 'react-router-dom';


class TagOptionsMenu extends React.Component {

    constructor(props){
        super(props);
        // this.handleOptionClick = this.handleOptionClick.bind(this);
        // debugger
        this.handleDeletion = this.handleDeletion.bind(this);
    }

    componentDidMount(){
            
    }

    handleMouseEnter(e) {
        $(e.target).addClass('grey');
    }

    handleMouseLeave(e) {
        $(e.target).removeClass('grey');
    }

    handleDeletion(){
        const {tag, deleteTag, toggleTagOptionsDisplay, history} = this.props;
        return (e) => {
        deleteTag(tag.id);
        toggleTagOptionsDisplay(e);
    }

    }

    componentWillUnmount(){
        // $('.tag-'+this.props.tag.id).removeClass('selected');
    }
    // handleOptionClick(e) {
    //     // $(e.target).siblings().removeClass('active');
    //     $(e.target).addClass('active');
    //     const { updateUser, currentUser, toggleSortDisplay } = this.props;
    //     const newPref = { note_sort_order: e.target.innerText };
    //     updateUser(Object.assign({}, currentUser, newPref))
    //     .then(toggleSortDisplay());
    // }

render() {
    // $('.tag-'+this.props.tag.id).addClass('selected');
    // debugger
    const { toggleTagOptionsDisplay, pos } = this.props;
    const top = window.innerHeight - pos[1] > 150 ? `${pos[1] + 13}px` : `${pos[1] - 150}px`;
    const left = `${window.innerWidth - pos[0] - 8}px`;
    const styleObj = {'--tag-options-x': left, '--tag-options-y': top };
    return (
        <>
        <div className="clickOutWrapper" onClick={toggleTagOptionsDisplay}>
        </div>
            <ul className="TagOptions" style={styleObj}>
                <li className="SortByOption"
                    onMouseEnter={this.handleMouseEnter}
                    onClick={this.handleDeletion()}
                    onMouseLeave={this.handleMouseLeave}
                    >
                   Delete tag...
            
                </li>
                <li className="SortByOption"
                    onMouseEnter={this.handleMouseEnter}
                    onClick={this.handleOptionClick}
                    onMouseLeave={this.handleMouseLeave}>
                    Rename tag...
            
                </li>
                <li className="SortByOption"
                    onMouseEnter={this.handleMouseEnter}
                    onClick={this.handleOptionClick}
                    onMouseLeave={this.handleMouseLeave}>
                    Remove tag from all notes...
            
                </li>
            </ul>
        </>
    )
}
};

const msp = (state, { tag, toggleTagOptionsDisplay, history }) => ({
    tag,
    toggleTagOptionsDisplay,
    history
})

const mdp = dispatch => ({
    patchTag: tag => dispatch(patchTag(tag)), 
    deleteTag: tagId => dispatch(deleteTag(tagId))
})
const connectedComp = connect(msp, mdp)(TagOptionsMenu);
export default withRouter(connectedComp);

