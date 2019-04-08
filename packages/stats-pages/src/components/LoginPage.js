import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export class LoginPage extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated()) {
      return <div>is authenticated</div>;
    }

    return (
      <div>
        <Button onClick={this.login(this)}>Login</Button>
      </div>
    );
  }
}

export default LoginPage;
