import React from 'react';
import { connect, withRouter } from 'react-redux';


class NoteContent extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="NoteDetail_DisableWrapper" onClick={isDeleted ? null : this.toggleDisabled("NoteDetail_NoteContent")}>
                <textarea
                    className="NoteDetail_NoteContent"
                    onChange={this.props.handleChange('content')}
                    value={this.props.content ? this.props.content : ''}
                    disabled
                    onBlur={this.props.handleBlur}>
                </textarea>
            </div>
        )
    }

}

const msp = (state, ownProps) => {
    const { isDeleted, toggleDisabled, handleChange, handleBlur } = ownProps;
    return({
        isDeleted,
        toggleDisabled,
        handleChange,
        handleBlur
});
};

const mdp = dispatch => ({

});

const connectedComponent = connect(msp)(NoteContent);
export default connectedComponent//withRouter(connectedComponent);