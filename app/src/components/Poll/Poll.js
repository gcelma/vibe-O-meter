import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { graphql } from '@apollo/react-hoc';
import { CREATE_POLL } from './Poll.mutation';
import { USER_POLLS } from '../Polls/Polls.query';
import Header from '../Header/Header';
import Form from '../Form/Form';
import Vote from '../Vote/Vote';
import Feedback from '../Feedback/Feedback';

class Poll extends Component {
    state = { name: null, displayVote: null, good: 0, mid: 0, bad: 0, feedback: null };

    handleNameSubmit = ({ name }) => {
        this.setState({ name });
    }

    handleClick = () => {
        this.setState({ displayVote: true });
    }

    handleVote = (vote) => {
        let { displayVote, good, mid, bad } = this.state;
        switch(vote) {
            case('good'):
                this.setState({ good: good + 1 });
                break;
            case('mid'):
                this.setState({ mid: mid + 1 });
                break;
            case('bad'):
                this.setState({ bad: bad + 1 });
                break;
            default:
                return null;
        }
        this.setState({ displayVote: !displayVote });
    }

    handleSubmitPoll = async () => {
        const { name, good, mid, bad } = this.state;

        if(!name) return this.setState({ feedback: 'please give this poll a name to continue' });
        
        const { createPollMutation } = this.props;
        const { errors } = await createPollMutation({
            variables: {input: {
                name,
                good,
                mid,
                bad
            }}
        });

        errors ? this.setState({ feedback: 'Impossible to submit, try again later.' }) : this.props.history.push('/success');
    }

    render() {
        const { handleClick, handleVote, handleSubmitPoll, state: { displayVote, feedback } } = this;

        return <Fragment>
            <Header />
            <Form name actionButton={'add'} handleFormSubmit={this.handleNameSubmit} />
            <button onClick={ handleClick }>Add vote</button>
            {displayVote && <Vote handleVote={handleVote} />}
            <div onClick={handleSubmitPoll}>Submit</div>
            {feedback && <Feedback message={feedback} />}
        </Fragment> 
        
    }
}

export default graphql(CREATE_POLL, {
    name: 'createPollMutation',
    options: {
        update: (cache, { data: { createPoll } }) => {
            const data = cache.readQuery({ query: USER_POLLS });
            const newData = [...data.getUserPolls, createPoll];
            cache.writeQuery({ query: USER_POLLS, data: { getUserPolls: newData } });
        },
    },
})(withRouter(Poll));