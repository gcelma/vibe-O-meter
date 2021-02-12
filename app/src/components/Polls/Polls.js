import React, { Component, Fragment } from 'react';
import { graphql } from '@apollo/react-hoc';
import { compose } from 'redux';
import { USER_POLLS } from './Polls.query';
import { DELETE_POLL } from  './Polls.mutation';
import { isArrayEmpty } from '../../utils/common';

class Polls extends Component {

    deletePoll = async (id) => {
        const { deletePollMutation } = this.props;
        const result = await deletePollMutation({
                    variables: {input:id}
        })
        return !isArrayEmpty(result.errors) ? result.errors : result.data;
    }

    render() {
        const { deletePoll, props: { userPollsQuery: {error, loading, getUserPolls } } } = this;
        if(loading) {
            return <p>loading</p>
        }
        if(error) {
            return <p>error</p>
        }
        const userPolls = [ ...getUserPolls ];
        return <Fragment>
        <p>Polls</p>
        <div>
            {isArrayEmpty(getUserPolls)
                ? <p>No polls created yet</p>
                : (userPolls.reverse()).map(({ id, name, date, good, mid, bad }) => <div key={id}>{'POLLS'}<p>{name}</p><p>{date}</p><p>{good}</p><p>{mid}</p><p>{bad}</p><p onClick={() => deletePoll(id)}>delete</p></div>)}
        </div>
        </Fragment>
    }
}

export default compose(
    graphql(USER_POLLS, {name: 'userPollsQuery'}),
    graphql(DELETE_POLL, {
        name: 'deletePollMutation',
        options: {
            update: (cache, { data: { deletePoll } }) => {
                const data = cache.readQuery({ query: USER_POLLS });
                const newData = data.getUserPolls.filter(poll => poll.id !== deletePoll.id)
                cache.writeQuery({ query: USER_POLLS, data: { getUserPolls: newData } })
            },
        },
    }),
    )(Polls);