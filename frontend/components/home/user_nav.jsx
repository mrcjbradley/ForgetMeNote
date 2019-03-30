import React from 'react';
import { logOut } from '../../actions/session_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UserNav extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e)
    {
        e.preventDefault();
        const { logOut } = this.props;
        logOut();//.then(() => history.push('/'));
    }

    render()
    {
        return (
            <nav className="userNav">
                <ul className="userNav_sessionOptions">
                    <Link className="userNav_logoutLink" to="#" onClick={this.handleClick}>Log Out</Link>
                </ul>
            </nav>
        )
    };

}

// const msp = (state,{match: {history}}) => ({
//     history
// });

const mdp = dispatch => ({
    logOut: () => dispatch(logOut())
});

export default connect(undefined, mdp)(UserNav);