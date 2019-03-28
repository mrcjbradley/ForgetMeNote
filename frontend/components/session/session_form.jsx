import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class SessionForm extends React.Component
{
    constructor(props){
        // this.handleChange = this.handleChange.bind(this);
        super(props);
        this.state = Object.assign({},props.currentUser,{password:''});
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(field){
        return (e) => {
            this.setState({ [field]: e.target.value });
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.processForm(this.state).then(() => {
            this.props.history.push('/');
        });
    }

    render(){
        const { path } = this.props.match;
        const { errors } = this.props;
        const alternate = (path === '/login') ? '/signup' : '/login';
        const [alternateText, alternateQuestion] = (path === '/login') ? ['Create account', 'Don\'t have an account?'] : ['Sign In', 'Already have an account?'];
        const errorList = errors.map((error, idx) => {
            return <li key={idx}>{error}</li>
        });

        return (
            <div className="formMain">
                    <div className="formFrame">
                        <div className={alternate.slice(1) + 'FormWrapper'}>
                            <div className="formBody">
                                <div className="heading">
                                    <div className="formLogo">
                                        <figure></figure>
                                        <p className="tagline">Forget <em>Not</em> what's important.</p>
                                    </div>
                                </div>
                                {/* <div className="form"> */}
                                        <form onSubmit={this.handleSubmit}>
                                            <ol>
                                                <li className="row">
                                                    <div className="demo-user-wrapper">
                                                        <div className="demo-user-btn">
                                                            <Link to="/login"> Sign in as Demo User </Link>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="row horizontalRow">
                                                    <div className="horizontalText">or</div>
                                                    <div className="horizontalLine"></div>
                                                </li>
                                                <li className="row">
                                                    <div className="input-wrapper">
                                                        <input 
                                                        onChange={this.handleChange('email')} 
                                                        type="text" 
                                                        value={this.state.email} />
                                                    </div>
                                                </li>
                                                <li className="row">
                                                    <div className="input-wrapper">
                                                        <input 
                                                        onChange={this.handleChange('password')} 
                                                        type="password" 
                                                        value={this.state.password} />
                                                    </div>
                                                </li>
                                                <li className="row">
                                        <input className="btn-submit" type="submit" value="Submit" />
                                                </li>
                                            </ol>
                                                <ul>
                                                    {errorList}
                                                </ul>
                                        </form>
                                {/* </div> */}
                            <div className="switch-context">
                            &nbsp; {alternateQuestion} &nbsp; <br/>
                                <Link to={alternate}>{alternateText}</Link>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
 
        );
    }
}