import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'

class Landing extends Component {
    render() {
        return <div className="landing">
            <div><Link to="/login">LOGIN</Link></div>
            <div><Link to="/register">REGISTER</Link></div>
            {/* <div><Link to="/home">HOME</Link></div> */}
        </div>
    }
}

export default withRouter(Landing);