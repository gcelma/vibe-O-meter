import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { graphql } from '@apollo/react-hoc';
import Form from '../Form/Form';
import { CREATE_RESET_LINK } from './Recovery.query';

class Recovery extends Component {
    handleFormSubmit = async ({ email }) => {
        const { createResetLinkMutation } = this.props;
        const { errors, data } = await createResetLinkMutation({
            variables: {input: {
                email,
            }}
        });
        if (errors) {
            // TODO errorHandling
            console.log(errors);
        } else {
            this.props.history.push('/checkEmail');
        } 
    };

    render() {
        const { handleFormSubmit } = this

        return <div>
            <div><Link to="/login">back</Link></div>
            <Form email handleFormSubmit={handleFormSubmit} />
        </div>
    }
}

export default graphql(CREATE_RESET_LINK, {name: 'createResetLinkMutation'})(withRouter(Recovery));