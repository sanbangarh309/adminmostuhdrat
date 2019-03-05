import React, { Component } from 'react';
import SweetAlert from 'sweetalert-react';

export default class SanAlert extends React.Component {
  constructor() {
      super();
      this.state = {
          show: this.props.show,
          alert: '',
         
      };
      console.log(this.props);
      // This binding is necessary to make `this` work in the callback
      this.toggle = this.toggle.bind(this);
      this.closePopUp = this.closePopUp.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange(e) {
      this.setState({[e.target.name]: e.target.value});
  }

  closePopUp(){
    setTimeout(
        function() {
            return <Redirect to='/dashboard'  />
        }
        .bind(this),
        1000
    );
  }
  render() {
    return (
      <div>
        <SweetAlert
          show={this.state.show}
          title="Demo"
          text="SweetAlert in React"
          onConfirm={() => this.setState({ show: false })}
        />
      </div>
    );
  }
}
