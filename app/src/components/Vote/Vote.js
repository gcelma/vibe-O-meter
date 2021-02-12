import React, { Component, Fragment } from 'react';
import './Vote.sass';

class Vote extends Component {
    state = { good: null, mid: null, bad: null };

    handleClick = (id) => {
        this.props.handleVote(id.target.innerHTML);
    }

    render() {
        return <Fragment>
            <div id="myModal" className="modal">
                <div className="modal-content">
                <p onClick={ this.handleClick }>good</p>
                <p onClick={ this.handleClick }>mid</p>
                <p onClick={ this.handleClick }>bad</p>
                </div>
            </div>
        </Fragment>
    }
}

export default Vote;