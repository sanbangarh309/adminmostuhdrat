import React from 'react';
import  { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './Login.css';
import auth from 'src/auth';

@connect((store) => {
    return {
        user: store.user,
    };
})
export default class LoginForm extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func,
        user: PropTypes.object,
    };

    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            confirmedPassword: '',
            name: '',
            redirectToReferrer: false,
            container_class:['container']
        };
        // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    componentDidMount() {
    }

    togglePopup(){
        this.setState({container_class:['active','container']});
    }

    closePopup(){
        this.setState({container_class:['container']});
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.dispatch(auth.actions.login(this.state, '/admin/home'));
    }

    handleSignup(e) {
        e.preventDefault();
        this.props.dispatch(auth.actions.signup(this.state));
    }

    render() {
        if (localStorage.getItem('jwtToken')) {
          return (<Redirect to={'/admin/home'}/>)
        }
        // const {user} = this.props;
        // if (user.authorized) {
        //     return <p>You are logged in as {user.name} already.</p>;
        // }

        return (
            <div className={this.state.container_class.join(' ')} id="san_login">
    <div className="row">
<div className="pen-title">
  <h1>Dashboard Login</h1>
</div>
<div className="container">
  <div className="card"></div>
  <div className="card">
    <h1 className="title">Login</h1>
      <div className="input-container">
        <input type="text" id="Username" value={this.state.email} onChange={this.handleChange} name="email" required="required"/>
        <label for="Username">Username</label>
        <div className="bar"></div>
      </div>
      <div className="input-container">
        <input type="password" value={this.state.password} name='password' onChange={this.handleChange} id="Password" required="required"/>
        <label for="Password">Password</label>
        <div className="bar"></div>
      </div>
      <div className="button-container">
        <button onClick={this.handleSubmit}><span>Go</span></button>
      </div>
      <div className="footer"><a href="#">Forgot your password?</a></div>
  </div>
  <div className="card alt">
    <div className="toggle" onClick={this.togglePopup}></div>
    <h1 className="title">Register
      <div className="close" onClick={this.closePopup}></div>
    </h1>
    <form>
      <div className="input-container">
        <input required
                    name='email'
                    type='email'
                    value={this.state.email}
                    onChange={this.handleChange}
                />
        <label for="Username">Email</label>
        <div className="bar"></div>
      </div>
      <div className="input-container">
        <input required
                    name='name'
                    type='text'
                    value={this.state.name}
                    onChange={this.handleChange}
                />
        <label for="Username">Username</label>
        <div className="bar"></div>
      </div>
      <div className="input-container">
        <input required
                    name='password'
                    type='password'
                    value={this.state.password}
                    onChange={this.handleChange}
                />
        <label for="Password">Password</label>
        <div className="bar"></div>
      </div>
      <div className="input-container">
        <input required
                    name='confirmedPassword'
                    type='password'
                    value={this.state.confirmedPassword}
                    onChange={this.handleChange}
                />
        <label for="Password">Confirm Password</label>
        <div className="bar"></div>
      </div>
      <div className="button-container">
        <button onClick={this.handleSignup}><span>Next</span></button>
      </div>
    </form>
  </div>
</div>
    </div>
</div>
        );
    }
}
