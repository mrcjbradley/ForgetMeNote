import React from 'react';
import { connect } from 'react-redux';
import { patchTag, deleteTag } from '../../actions/tag_action';


class TagOptionsMenu extends React.Component {

    constructor(props){
        super(props);
        // this.handleOptionClick = this.handleOptionClick.bind(this);
    }

    componentDidMount(){
            
    }

    handleMouseEnter(e) {
        $(e.target).addClass('grey');
    }

    handleMouseLeave(e) {
        $(e.target).removeClass('grey');
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
    const { toggleTagOptionsDisplay, pos } = this.props;
    const styleObj = {'--tag-options-x': `${pos[0]}px`, '--tag-options-y': `${pos[1]}px` };
    return (
        <>
        <div className="clickOutWrapper" onClick={toggleTagOptionsDisplay}>
        </div>
            <ul className="TagOptions" style={styleObj}>
                <li className="SortByOption"
                    onMouseEnter={this.handleMouseEnter}
                    onClick={this.handleOptionClick}
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

const msp = (state, { tag, toggleTagOptionsDisplay }) => ({
    tag,
    toggleTagOptionsDisplay
})

const mdp = dispatch => ({
    patchTag: tag => dispatch(patchTag(tag)), 
    deleteTag: tagId => dispatch(deleteTag(tagId))
})

export default connect(msp, mdp)(TagOptionsMenu);

