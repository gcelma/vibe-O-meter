import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { graphql } from '@apollo/react-hoc';
import Form from '../Form/Form';
import { CREATE_USER } from './Register.mutation';

class Register extends Component {
    handleFormSubmit = async ({ username, email, password, passwordConfirmation}) => {
        const { createUserMutation } = this.props;
        const { errors } = await createUserMutation({
            variables: {input: {
                username,
                email,
                password,
                passwordConfirmation
            }}
        });
        errors ? console.log(errors) : this.props.history.push('/success');
    };

    render() {
        const { handleFormSubmit } = this;
        return <div className="register">
            <div>register</div>
            <div><Link to="/login">back</Link></div> 
            <Form username email password passwordConfirmation handleFormSubmit={handleFormSubmit} />
            </div>
        };
    }
    

export default graphql(CREATE_USER, {name: 'createUserMutation'})(withRouter(Register));