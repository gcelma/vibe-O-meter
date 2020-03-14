import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class Login extends Component {
    render() {
        return <div className="login">
            <div>login</div>
            <div><Link to="/landing">back</Link></div>
        </div>
    }
}

export default withRouter(Login);