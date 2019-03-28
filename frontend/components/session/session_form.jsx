import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { validateEmail } from '../../actions/session_actions';

export default class SessionForm extends React.Component
{
    constructor(props){
        // this.handleChange = this.handleChange.bind(this);
        super(props);
        this.state = Object.assign({},props.currentUser, this.props.errors, {password:''});
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    handleChange(field){
        return (e) => {
            this.setState({ [field]: e.target.value });
            this.props.clearErrors();
        };
        // this.toggleSubmitButton();
    }

    componentWillUnmount(){
        this.props.clearErrors();
       
    }

    componentDidMount(){
        this.submit = document.getElementById('form-btn');
    }

    toggleSubmitButton(){
        const { errors } = this.props;
        const submit = document.getElementById('form-btn');
        if (errors.includes("There is no account for the email you entered.")){
            submit.classList.remove("show-me");
        } else {
            submit.classList.add('show-me');
        }
    }

    componentDidUpdate(){
        this.toggleSubmitButton();
        // this.props.clearErrors();

    }



    handleSubmit(e) {
        e.preventDefault();
        const {email} = this.state;
        debugger
        if (this.props.currentUser.email) {
            this.props.processForm(this.state).then(() => {
                this.props.history.push('/'); 
            });
        } else {
            this.props.validateEmail(email);//.then(res => this.setState(res));
        }
        
    }

    // handleBlur(e) {
    //     e.preventDefault();
    //     const { validEmail } = this.props;
    //     const { email } = this.state;
    //     if (validEmail)
    //     {
    //         return null;
    //     } else {
    //     this.props.validateEmail(email);//.then(res => this.setState(res));
    //     }
    // }

    handleFocus(e){
        
        e.preventDefault();        
        this.props.clearErrors();
    }


    render(){
        const { path } = this.props.match;
        const { errors } = this.props;
        // errors = errors.concat(this.state.errors);
        const [alternate, wrapperClass] = (path === '/login') ? ['/signup', 'login'] : ['/login','signup'];
        const [alternateText, alternateQuestion] = (path === '/login') ? ['Create account', 'Don\'t have an account?'] : ['Sign In', 'Already have an account?'];
        const errorList = errors.map((error, idx) => {
            // debugger
            return <li key={idx}>{error}</li>
        });
        const errorListOuter = <ul>{errorList}</ul>;    

        return (
            <div className="formMain">
                    <div className="formFrame">
                        <div className={wrapperClass + 'FormWrapper'}>
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
                                                    <Link className="demo-user-wrapper" to="/login">
                                                        <div className="demo-user-btn">
                                                            <div >
                                                                Sign in as Demo User 
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                                <li className="row horizontalRow">
                                                    <div className="horizontalText">or</div>
                                                    <div className="horizontalLine"></div>
                                                </li>
                                    <li className="row">
                                                    <div className="input-wrapper">
                                                        <input 
                                                        onChange={this.handleChange('email')} 
                                                        // onBlur={this.handleBlur}
                                                        onFocus={this.handleFocus}
                                                        type="text" 
                                                        value={this.state.email} 
                                                        className="show-me"
                                                        placeholder="Email"/>
                                                    </div>
                                                </li >
                                    <li className="row">
                                                    <div className="input-wrapper">
                                                        <input 
                                                        onChange={this.handleChange('password')} 
                                                        onFocus={this.handleFocus}
                                                        type="password" 
                                                        className={this.props.currentUser.email ? 'show-me' : 'hide-me'}
                                                        value={this.state.password} 
                                                        placeholder="Password"/>
                                                        
                                                    </div>
                                                </li>
                                    {/* <li className={(this.state.errors.length > 0 )? 'show-me row' : 'hide-me row'}> */}
                                    <li className="row">
                                        <div className="input-wrapper">
                                            <div className={(this.props.errors.length > 0) ? 'show-me errors' : 'hide-me errors'}>
                                                        {errorListOuter}
                                                    </div>
                                                    </div>
                                                </li>
                                                <li className="row">
                                                <div className="input-wrapper">
                                                    <input id="form-btn" className= "btn-submit show-me" type="submit" value="Continue" />
                                               </div> 
                                               </li>
                                            </ol>
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