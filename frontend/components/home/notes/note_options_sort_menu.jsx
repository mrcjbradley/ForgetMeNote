import React from 'react';

class NoteOptionsSortMenu extends React.Component {

    handleMouseEnter(e) {
        $(e.target).addClass('grey');
    }

    handleMouseLeave(e) {
        $(e.target).removeClass('grey');
    }

    handleOptionClick(e) {
        $(e.target).siblings().removeClass('active');
        $(e.target).addClass('active');
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
}};

export default NoteOptionsSortMenu;