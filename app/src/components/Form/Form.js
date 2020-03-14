import React, { Component } from 'react';

class Form extends Component {
    
    state = { 
        username: null, 
        email: null, 
        password: null, 
        passwordConfirmation: null 
    };

    handleInput = event => this.setState({[event.target.name] : event.target.value});

    handleFormSubmit = event => {
        event.preventDefault();
        this.props.handleFormSubmit(this.state);
    }

    render() {
        const { handleFormSubmit, handleInput } = this;
        const { username, email, password, passwordConfirmation } = this.props;

        return <div className="form">
            <form className="registerForm" onSubmit={handleFormSubmit}>
                    {username && <input type="text" name="username" onChange={handleInput} placeholder="username" />}
                    {email && <input type="text" name="email" onChange={handleInput} placeholder="email" />}
                    {password && <input type="password" name="password" onChange={handleInput} placeholder="password" />}
                    {passwordConfirmation && <input type="password" name="passwordConfirmation" onChange={handleInput} placeholder="confirm password" />}
                    <button>GO!</button>                
                </form>
        </div>
    }
}

export default Form;