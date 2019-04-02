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

    render(){
        const { currentUser } = this.props;
        const bgImg = { backgroundImage: `url(${currentUser.image_url})`};
        return (
            <nav className="userNav">
                <div className="currentUserInfo">
                    <Link to="#" className="userNav_toggleMenu">
                        <div className="bg--user-icon" style={bgImg}></div>
                        <span className="CurrentUserEmail">{currentUser.email}</span>
                    </Link>
                </div>
                <ul className="userNav_sessionOptions">
                    <li className="accountTitle">Account</li>
                    <li className='userNav_toggleMenu'>
                        <div className="bg--user-icon inner" style={bgImg}></div>
                        <span className="CurrentUserEmail inner">{currentUser.email}</span>
                    </li>
                    <li className="spacerRow"></li>
                    <li className="logoutWrapper"> 
                        <Link className="userNav_logoutLink" to="#" onClick={this.handleClick}>Sign out {currentUser.email}</Link>
                    </li>
                </ul>
            </nav>
        )
    };
}

const msp = ({ session: { currentUser } }) => ({
    currentUser
});

const mdp = dispatch => ({
    logOut: () => dispatch(logOut())
});

export default connect(msp, mdp)(UserNav);