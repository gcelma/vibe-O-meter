import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { graphql } from '@apollo/react-hoc';
import Form from '../Form/Form';
import { AUTHENTICATE_USER } from './Login.query';
import auth from '../../utils/auth';

class Login extends Component {
    handleFormSubmit = async ({ email, password }) => {
        const { authenticateUserMutation } = this.props;
        const { errors, data } = await authenticateUserMutation({
            variables: {input: {
                email,
                password
            }}
        });
        if (errors) {
            // TODO errorHandling
            console.log(errors);
        } else {
            auth.__userApiToken__ = data.authenticateUser.token;
            this.props.history.push('/home');
        } 
    };

    render() {
        const { handleFormSubmit } = this;
        return <div className="login">
            <div>login</div>
            <Form email password handleFormSubmit={handleFormSubmit} />
            <div><Link to="/register">register</Link></div>
            <div><Link to="/recovery">forgot password</Link></div>
            </div>
        };
    }
    

export default graphql(AUTHENTICATE_USER, {name: 'authenticateUserMutation'})(withRouter(Login));