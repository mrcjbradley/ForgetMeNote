import React from 'react';
import { Link } from 'react-router-dom';



export default class SessionForm extends React.Component
{
    constructor(props){
        // this.handleChange = this.handleChange.bind(this);
        super(props);
        this.state = Object.assign({},props.currentUser, this.props.errors, {password:''});
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleDemo = this.handleDemo.bind(this);
        this.pwInput = React.createRef();
        this.focusInput = this.focusInput.bind(this);
        this.demoUser = {
            email: 'demo@user.login',
            password: 'banana',
        };
    }

    
    handleChange(field){
        return (e) => {
            this.setState({ [field]: e.target.value });
            this.props.clearErrors();
        };
    }
    
    componentWillUnmount(){
        this.props.clearErrors();
    }
    
    componentDidMount(){
        this.submit = document.getElementById('form-btn');
        this.emailField = $('input[type=text]');
        this.pwField = $('input[type=password]');
    }
    
    handleDemo(){
        return (e) => {
        e.preventDefault();
        const { email, password } = this.demoUser;
        setTimeout(()=>{
            this.setState({email});
         }, 300);
        setTimeout(()=>{
            $(this.submit).click();
         }, 500);
        setTimeout(()=>{
            this.setState({password});
        }, 2000);
        setTimeout(()=>{
            $(this.submit).click();
        }, 3000);
    };
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
    }

    handleSubmit(e) {
        e.preventDefault();
        const {email} = this.state;
        if (this.props.match.path === "/signup"){
            this.props.processForm(this.state).then(() => {
                this.props.history.push('/');
        });} else if (this.props.currentUser.email && this.props.currentUser.email === email){
            this.props.processForm(this.state).then(() => {
                this.props.history.push('/'); 
            });
        } else {
            this.props.validateEmail(email).then(()=> setTimeout(this.focusInput, 1000));
        }
    }

    handleFocus(e){ 
        e.preventDefault();        
        this.props.clearErrors();
    } 

    focusInput(){
        this.pwInput.current.focus();
    }


    render(){
        const { path } = this.props.match;
        const { errors } = this.props;
        // errors = errors.concat(this.state.errors);
        const [alternate, wrapperClass] = (path === '/login') ? ['/signup', 'login'] : ['/login','signup'];
        const [alternateText, alternateQuestion] = (path === '/login') ? ['Create account', 'Don\'t have an account?'] : ['Sign In', 'Already have an account?'];
        const errorList = errors.map((error, idx) => {
            return <span key={idx}>{error}<br /></span>
        });

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
                                                    <Link onClick={this.handleDemo()} className="demo-user-wrapper" to="/login">
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
                                                        ref={this.pwInput}
                                                        className={(this.props.currentUser.email && this.props.currentUser.email === this.state.email ) ? 'show-me' : 'hide-me'}
                                                        value={this.state.password} 
                                                        placeholder="Password"/>
                                                        
                                                    </div>
                                                </li>
                                    <li className="row">
                                        <div className="input-wrapper">
                                            <div className={(this.props.errors.length > 0) ? 'show-me errors' : 'hide-me errors'}>
                                                        {errorList}
                                                    </div>
                                                    </div>
                                                </li>
                                                <li className="row">
                                                <div className="input-wrapper">
                                            <input id="form-btn" className="btn-submit show-me" type="submit" value={(alternate === '/signup' && this.props.currentUser.email && this.props.currentUser.email === this.state.email) ? 'Sign In' : 'Continue'} />
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