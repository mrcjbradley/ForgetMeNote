import React from 'react';
import { Link } from 'react-router-dom';
import { logOut } from '../../actions/session_actions';
import { connect } from 'react-redux';

class UserNav extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        const { logOut } = this.props;
        logOut();//.then(() => history.push('/'));
    }

    render(){
        return(
        <div>
             Welcome to the note section! This is just some temporary content 
            <button onClick={this.handleClick}>Log Out</button>
        </div>
        )};
    
}

// const msp = (state,{match: {history}}) => ({
//     history
// });

const mdp = dispatch => ({
    logOut: () => dispatch(logOut())
});

export default connect(undefined, mdp)(UserNav);