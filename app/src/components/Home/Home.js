import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Polls from '../Polls/Polls';

class Home extends Component {
    render() {
        return <div className="Home">
            <div>home</div>
            <div><Link to="/landing">back</Link></div>
            <Polls />
        </div>
    }
}

export default withRouter(Home);