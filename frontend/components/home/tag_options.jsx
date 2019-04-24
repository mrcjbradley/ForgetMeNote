import React from 'react';


class TagOptionsMenu extends React.Component {

    constructor(props){
        super(props);
        // this.handleOptionClick = this.handleOptionClick.bind(this);
        
        this.handleDeletion = this.handleDeletion.bind(this);
        this.handleUpdateTag = this.props.handleUpdateTag.bind(this);
        this.handleDeleteTag = this.props.handleDeleteTag.bind(this);
        this.handleRemoveAllNotesFromTag = this.props.handleRemoveAllNotesFromTag.bind(this);
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
    };

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
    
    const { toggleTagOptionsDisplay, pos, handleUpdateTag, tag, handleDeleteTag, handleRemoveAllNotesFromTag } = this.props;
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
                    onClick={handleDeleteTag}
                    onMouseLeave={this.handleMouseLeave}
                    >
                   Delete tag...
            
                </li>
                <li className="SortByOption"
                    onMouseEnter={this.handleMouseEnter}
                    onClick={handleUpdateTag}
                    onMouseLeave={this.handleMouseLeave}>
                    Rename tag...
            
                </li>
                <li className="SortByOption"
                    onMouseEnter={this.handleMouseEnter}
                    onClick={handleRemoveAllNotesFromTag}
                    onMouseLeave={this.handleMouseLeave}>
                    Remove tag from all notes...
            
                </li>
            </ul>
        </>
    )
}
};


export default TagOptionsMenu;

