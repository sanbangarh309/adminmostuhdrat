import React from 'react';
import  { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import './Login.css';
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
            redirectToReferrer: false,
        };
        // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.dispatch(auth.actions.login(this.state, '/basic-permission'));
    }

    render() {
        if (!localStorage.getItem('jwtToken')) {
          return (<Redirect to={'/admin/home'}/>)
        }
        const {user} = this.props;
        if (user.authorized) {
            return <p>You are logged in as {user.name} already.</p>;
        }

        return (
            <div className="container">
    <div className="row">
<div className="pen-title">
  <h1>Material Login Form</h1>
</div>
<div className="container">
  <div className="card"></div>
  <div className="card">
    <h1 className="title">Login</h1>
    <form>
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
        <button><span>Go</span></button>
      </div>
      <div className="footer"><a href="#">Forgot your password?</a></div>
    </form>
  </div>
  <div className="card alt">
    <div className="toggle"></div>
    <h1 className="title">Register
      <div className="close"></div>
    </h1>
    <form>
      <div className="input-container">
        <input type="text" id="Username" required="required"/>
        <label for="Username">Username</label>
        <div className="bar"></div>
      </div>
      <div className="input-container">
        <input type="password" id="Password" required="required"/>
        <label for="Password">Password</label>
        <div className="bar"></div>
      </div>
      <div className="button-container">
        <button onClick={this.handleSubmit}><span>Next</span></button>
      </div>
    </form>
  </div>
</div>
    </div>
</div>
        );
    }
}
