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
        const alternateText = (path === '/login') ? 'sign up' : 'login';
        const errorList = errors.map((error, idx) => {
            return <li key={idx}>{error}</li>
        });

        return (
            <form onSubmit={this.handleSubmit}>
                <label >email<input onChange={this.handleChange('email')} type="text" value={this.state.email} /></label>
                <label >password<input onChange={this.handleChange('password')} type="password" value={this.state.password} /></label>
                <input type="submit" value="Submit" />
                &nbsp; or &nbsp;
      <Link to={alternate}>{alternateText}</Link>
                <ul>
                    {errorList}
                </ul>
            </form>
        );
    }
}