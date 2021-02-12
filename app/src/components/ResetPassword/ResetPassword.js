import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { graphql } from '@apollo/react-hoc';
import Form from '../Form/Form';
import { RESET_PASSWORD } from './ResetPassword.mutation';

class ResetPassword extends Component {
    state = {
        resetFailed: false
    }

    handleFormSubmit = async ({ password }) => {
        const token = this.props.match.params.token;
        const { resetPaswordMutation } = this.props;
        const { errors, data } = await resetPaswordMutation({
            variables: {input: {
                newPassword: password,
                token
            }}
        });
        if (errors) {
            // TODO errorHandling
            console.log(errors);
        }
        if (data) {
            data.resetPassword.passwordReseted? this.props.history.push('/success') : this.setState({resetFailed: true});
        } 
    }

    render() {
        const { handleFormSubmit } = this;
        const { resetFailed } = this.state;

        return <div>
        <div><Link to="/login">back</Link></div>
        <p>Enter below your new password:</p>
        <Form password passwordConfirmation handleFormSubmit={handleFormSubmit} />
        {resetFailed && <p>An error ocurred and your password couldn't be reseted. Please try again later.</p>}
    </div>
    }
}

export default graphql(RESET_PASSWORD, {name: 'resetPaswordMutation'})(withRouter(ResetPassword));