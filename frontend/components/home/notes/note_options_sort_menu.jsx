import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../../actions/session_actions';


class NoteOptionsSortMenu extends React.Component {

    constructor(props){
        super(props);
        this.handleOptionClick = this.handleOptionClick.bind(this);
    }

    componentDidMount(){
        const orderTypes = [
            'Date created: Most to least recent',
            'Date created: Least to most recent',
            'Date updated: Most to least recent',
            'Date updated: Least to most recent',
            'Title: A to Z',
            'Title: Z to A'
        ];
        const { currentUser: {note_sort_order} } = this.props;
        const chosen = orderTypes.indexOf(note_sort_order);
        $($('.SortByOption')[chosen]).addClass('active');
    }

    handleMouseEnter(e) {
        $(e.target).addClass('grey');
    }

    handleMouseLeave(e) {
        $(e.target).removeClass('grey');
    }

    handleOptionClick(e) {
        $(e.target).siblings().removeClass('active');
        $(e.target).addClass('active');
        const { updateUser, currentUser, toggleSortDisplay } = this.props;
        const newPref = { note_sort_order: e.target.innerText };
        updateUser(Object.assign({}, currentUser, newPref))
        .then(toggleSortDisplay());
    }

    render() {
        return (
            <ul className="NoteOptions_SortMenu">
                <h2 className="SortByTitle">Sort by...</h2>
                <li className="SortByOption"
                    onMouseEnter={this.handleMouseEnter}
                    onClick={this.handleOptionClick}
                    onMouseLeave={this.handleMouseLeave}>
                    Date created: Most to least recent
            <span className="bg--check-icon"></span>
                </li>
                <li className="SortByOption"
                    onMouseEnter={this.handleMouseEnter}
                    onClick={this.handleOptionClick}
                    onMouseLeave={this.handleMouseLeave}>
                    Date created: Least to most recent
            <span className="bg--check-icon"></span>
                </li>
                <li className="SortByOption"
                    onMouseEnter={this.handleMouseEnter}
                    onClick={this.handleOptionClick}
                    onMouseLeave={this.handleMouseLeave}>
                    Date updated: Most to least recent
            <span className="bg--check-icon"></span>
                </li>
                <li className="SortByOption"
                    onMouseEnter={this.handleMouseEnter}
                    onClick={this.handleOptionClick}
                    onMouseLeave={this.handleMouseLeave}>
                    Date updated: Least to most recent
            <span className="bg--check-icon"></span>
                </li>
                <li className="SortByOption"
                    onMouseEnter={this.handleMouseEnter}
                    onClick={this.handleOptionClick}
                    onMouseLeave={this.handleMouseLeave}>
                    Title: A to Z
            <span className="bg--check-icon"></span>
                </li>
                <li className="SortByOption"
                    onMouseEnter={this.handleMouseEnter}
                    onClick={this.handleOptionClick}
                    onMouseLeave={this.handleMouseLeave}>
                    Title: Z to A
            <span className="bg--check-icon"></span>
                </li>
            </ul>
        )
}
};

const msp = ({ session: { currentUser } }, { toggleSortDisplay }) => ({
    currentUser,
    toggleSortDisplay
})

const mdp = dispatch => ({
    updateUser: user => dispatch(updateUser(user))
})

export default connect(msp, mdp)(NoteOptionsSortMenu);

