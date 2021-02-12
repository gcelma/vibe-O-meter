import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class CheckEmail extends Component {
    render() {
        return <div>
        <div><Link to="/login">back</Link></div>
        <p>Please check your email and click on the link to reset your password</p>
    </div>
    }
}

export default withRouter(CheckEmail);