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
    const { toggleTagOptionsDisplay } = this.props;
    return (
        <>
        <div className="clickOutWrapper" onClick={toggleTagOptionsDisplay}>
        </div>
            <ul className="NoteOptions_SortMenu">
                <h2 className="SortByTitle">Sort by...</h2>
                <li className="SortByOption"
                    onMouseEnter={this.handleMouseEnter}
                    onClick={this.handleOptionClick}
                    onMouseLeave={this.handleMouseLeave}
                    >
                   Delete tag...
            <span className="bg--check-icon"></span>
                </li>
                <li className="SortByOption"
                    onMouseEnter={this.handleMouseEnter}
                    onClick={this.handleOptionClick}
                    onMouseLeave={this.handleMouseLeave}>
                    Rename tag...
            <span className="bg--check-icon"></span>
                </li>
                <li className="SortByOption"
                    onMouseEnter={this.handleMouseEnter}
                    onClick={this.handleOptionClick}
                    onMouseLeave={this.handleMouseLeave}>
                    Remove tag from all notes...
            <span className="bg--check-icon"></span>
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

