import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Polls from '../Polls/Polls';
import Header from '../Header/Header';
import Chart from '../Chart/Chart';
import './Home.sass'

class Home extends Component {
    render() {
        return <Fragment>
            <Header />
            <section className="Home">
                <Chart />
                <Link to="/poll">New Poll</Link>
                <Polls />
            </section>
        </Fragment>
    }
}

export default withRouter(Home);