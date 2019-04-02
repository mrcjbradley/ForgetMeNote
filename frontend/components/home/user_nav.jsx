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

    toggleSessionMenu(e){
        e.preventDefault();
        $('.js-user-menu').toggle();
    }

    render(){
        const { currentUser } = this.props;
        const bgImg = { backgroundImage: `url(${currentUser.image_url})`};
        return (
            <nav className="userNav">
                <div className="currentUserInfo">
                    <Link to="#" className="userNav_toggleMenu" onClick={this.toggleSessionMenu}>
                        <div className="bg--user-icon" style={bgImg}></div>
                        <span className="CurrentUserEmail">{currentUser.email}</span>
                    </Link>
                </div>
                <div style={{display: 'none'}} className="clickOutWrapper js-user-menu" onClick={this.toggleSessionMenu}>
                    <ul className="userNav_sessionOptions ">
                        <li className="accountTitle">Account</li>
                        <li className='userNav_toggleMenu'>
                            <div className="bg--user-icon inner" style={bgImg}></div>
                            <span className="CurrentUserEmail inner">{currentUser.email}</span><span className="bg--check-icon blue"></span>
                        </li>
                        <li className="spacerRow"></li>
                        <li className="logoutWrapper"> 
                            <Link className="userNav_logoutLink" to="#" onClick={this.handleClick}>Sign out {currentUser.email}</Link>
                        </li>
                    </ul>
                </div>
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