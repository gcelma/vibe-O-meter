import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { graphql } from '@apollo/react-hoc';
import Form from '../Form/Form';
import Feedback from '../Feedback/Feedback';
import gql from 'graphql-tag';

const CREATE_USER = gql`
    mutation CreateUser($input: NewUserInput!) {
        createUser(input: $input) {
            id
        }
  }
`

class Register extends Component {
    state = { feedback: '' };

    handleFormSubmit = async ({ username, email, password}, passwordConfirmation) => {

        const { createUserMutation } = this.props;

        const { errors } = await createUserMutation({
            variables: {input: {
                username,
                email,
                password
            }}
        });

        errors ? console.log(errors) : this.props.history.push('/success');
    };

    render() {

        const { handleFormSubmit, state: { feedback } } = this;

        return <div className="register">
            <div>register</div>
            <div><Link to="/landing">back</Link></div> 
            <Form username email password passwordConfirmation handleFormSubmit={handleFormSubmit} />
            {feedback && <Feedback message={ feedback } />}
            </div>
        };
    }
    

export default graphql(CREATE_USER, {name: 'createUserMutation'})(withRouter(Register));